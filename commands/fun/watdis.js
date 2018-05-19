exports.run = async (client, message, args) => {
	let user;
	if(!args[0]) user = message.author;
	else if(message.mentions.users.array.length > 0) user = message.mentions.users.first();
	else if(client.isUser(args.join(' '))) user = client.isUser(args.join(' '));
	else return message.channel.send(`${message.member.nickname || message.author.username}, ${args[0]} is not a user. Please supply a user.`);
	await client.watDis(message, user);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['pointing'],
	permLevel: 'User',
};

exports.help = {
	name: 'watdis',
	category: 'Fun',
	description: 'Wat dis?',
	usage: 'pointing',
};
