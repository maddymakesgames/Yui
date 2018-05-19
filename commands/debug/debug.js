exports.run = async (client, message, args) => {

	const config = client.settings.get(message.guild.id);

	if(config.debug == true) {
		config.debug = false;
		message.channel.send('debug mode turned off');
	}
	else {
		config.debug = true;
		message.channel.send('debug mode turned on');
	}
	client.settings.set(message.guild.id, config);

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 'Contributors',
};

exports.help = {
	name: 'debug',
	category: 'Debug',
	description: 'Turns on debug mode.',
	usage: 'debug',
};
