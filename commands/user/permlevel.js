exports.run = async (client, message, args) => {
	message.channel.send(message.author.permLevel);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['level'],
	permLevel: 'User',
};

exports.help = {
	name: 'permLevel',
	category: 'User',
	description: 'Display\'s the user\'s permission level for the guild.',
	usage: 'permLevel',
};