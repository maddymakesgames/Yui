exports.run = async (client, message, args) => {// eslint-disable-line no-unused-vars
	if (!args || args.size < 1) return message.reply('Must provide a command to reload. Derp.');

	let response = await client.unloadCommand(args[0]);
	console.log(response);
	if (response && client.cmdFiles.indexOf(response) == -1) return message.reply(`Error Unloading: ${response}`);

	response = client.loadCommand(response);
	if (response) return message.reply(`Error Loading: ${response}`);

	message.reply(`The command \`${args[0]}\` has been reloaded`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'Bot Admin',
};

exports.help = {
	name: 'reload',
	category: 'System',
	description: 'Reloads a command that\'s been modified.',
	usage: 'reload [command]',
};
