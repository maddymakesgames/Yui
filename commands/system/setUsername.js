exports.run = async (client, message, args) => {
	if(!args[0]) return message.channel.send('You need to supply a name!');
	console.log('args detected');
	if(client.changeUsername >= 2) return message.channel.send(`The username for ${client.user} has already been changed twice in the last hour. Discord only allows username changes twice per hour. Please try again later.`);
	console.log('client.changeUsername is less than two');
	client.user.setUsername(args.join(' '));
	console.log(`${message.author} has changed the bot username to ${args.join(' ')}`);
	client.changeUsername++;
	if (client.changeUsername == 0) setTimeout(client.changeUsername = 0, 3600000);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'Bot Owner',
};

exports.help = {
	name: 'setUsername',
	category: 'System',
	description: 'Changes the bot\'s username.',
	usage: 'setUsername [name]',
};
