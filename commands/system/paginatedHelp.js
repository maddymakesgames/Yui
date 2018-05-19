exports.run = async (client, message, args, level) => {
	if(!args[0]) {
		const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;

		const myCmds = message.guild ? client.commands.filter(cmd => {
			for(let i = 0; i < client.perms.length; i++) {
				if(client.perms[i].level <= level && client.perms[i].name == cmd.conf.permLevel) return true;
			}
			return false;
		}) : client.commands.filter(cmd => {
			for (let i = 0; i < client.perms.length; i++) {
				if (cmd.conf.permLevel <= level && client.perms[i].name == cmd.conf.permLevel && cmd.conf.guildOnly !== true) return true;
			}
			return false;
		});
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['ph', 'phalp', 'paginatedHelp'],
	permLevel: 'Bot Owner',
};

exports.help = {
	name: 'pageHelp',
	category: 'System',
	description: 'Displays all the available commands for your permission level.',
	usage: 'pageHelp, pageHelp [command]',
};