const snekfetch = require('snekfetch');

exports.run = async (client, message, args) => {
	const URL = (client.isUser(args) || message.mentions.users.first() || message.author).displayAvatarURL;
	snekfetch.get(URL).then((data) => message.channel.send('', { files:[{ attachment: data.body }] }), (err) => console.error(err));
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'User',
};

exports.help = {
	name: 'avatar',
	category: 'Fun',
	description: 'Sends the use\'s avatar.',
	usage: 'avatar',
};
