exports.run = (client, message, args) => {
	const target = message.mentions.users.first() || client.isUser(args.join(' ')) || message.author;
	const settings = client.settings.get(message.guild.id);

	const credits = client.credits.get(target.id) || { credits: 0 };

	message.channel.send(`${target.username} you have ${credits.credits} credits`);
	if(settings.debug == true) {
		message.channel.send(JSON.stringify(credits));
	}
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'User',
};

exports.help = {
	name: 'credits',
	category: 'User',
	description: 'Shows how many credits you have.',
	usage: 'credits',
};