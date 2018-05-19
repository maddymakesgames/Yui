module.exports.run = async (client, message, args) => {
	if(!args[0]) message.channel.send(`${message.member.nickname || message.member.username} you need to supply either a color or a hex code.`);
	let hexcode = '';
	if(args[0].charAt(0) != '#' && client.isHex(args[0]) == true) {
		hexcode = '#' + args[0];
	}
	else if(args[0].charAt(0) == '#' && client.isHex(args[0].substring(1))) {
		hexcode = args[0];
	}
	else{
		const colors = {
			'color':{
				'red':'#FF0000',
				'blue':'#0404B4',
				'green':'#00FF00',
				'purple':'#5F04B4',
				'pink':'#FE2EF7',
				'yellow':'#FFFF00',
				'orange':'#FE9A2E',
				'cyan':'#00FFFF',
			},
		};
		const colorObj = colors['color'];
		for(const prop in colorObj) {
			if(args[0] == prop) {
				hexcode = colorObj[prop];
			}
		}
	}

	console.log(message.author.tag);
	let role = message.guild.roles.find('name', message.author.tag);
	console.log(role);
	if(role == null || role === undefined) {
		if(message.guild.roles.array.length == 250) return message.channel.send(`Sorry ${message.member.nickname || message.author.username}, this guild already has 250 roles and cannot create any more.`);
		role = await message.guild.createRole({
			name:message.author.tag,
			color:hexcode,
		});

		message.member.addRole(role.id);
	}
	else if(message.member.roles.has(role.id)) {
		role.setColor(hexcode);
	}
	else {
		message.member.addRole(role.id);
		role.setColor(hexcode);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['c', 'colour'],
	permLevel: 'User',
};

exports.help = {
	name: 'color',
	category: 'Fun',
	description: 'Change your name color.',
	usage: 'color <hexidecimal value of a color>',
};
