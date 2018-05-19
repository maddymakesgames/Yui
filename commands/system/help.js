/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/

exports.run = (client, message, args) => {
	const level = message.author.permLevel;
	// If no specific command is called, show all filtered commands.
	if (!args[0]) {
		console.log(level);
		// Load guild settings (for prefixes and eventually per-guild tweaks)
		const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;

		// Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
		const myCommands = message.guild ? client.commands.filter(cmd => client.canIRun(cmd, message)) : client.commands.filter(cmd => client.canIRun(cmd, message));
		console.log(myCommands.keyArray());
		console.log(client.commands.filter(cmd => client.canIRun(cmd, message)).keyArray());
		// Here we have to get the command names only, and we use that array to get the longest name.
		// This make the help commands "aligned" in the output.
		const commandNames = myCommands.keyArray();

		//console.log(commandNames);
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
		console.log(longest);

		let i = 0;
		let e = 0;
		const catCount = new Array();
		let currentCategory = '';
		let output = '```js\nCommand List```';
		const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1);


		sorted.forEach(c => {
			const cat = c.help.category.toProperCase();
			if (currentCategory !== cat) {
				currentCategory = cat;
				i++;
				catCount[i] = 0;
			}
			catCount[i]++;
		});

		currentCategory = '';
		i = 0;
		sorted.forEach(c => {
			const cat = c.help.category.toProperCase();
			if (currentCategory !== cat) {
				output += `**${cat}**:\n`;
				currentCategory = cat;
				e = 1;
				i++;
			}
			if (e != catCount[i]) {
				output += `\`${settings.prefix[0]}${c.help.name}\`, `;
			}
			else {
				output += `\`${settings.prefix[0]}${c.help.name}\`\n`;
			}

			e++;
		});
		output += `\`\`\`[Use ${settings.prefix[0]}help <commandname> for details]\`\`\``;
		message.channel.send(output);
	}
	else {
		// Show individual command's help.
		let command = args[0];
		if (client.commands.has(command)) {
			command = client.commands.get(command);
			if (level.level < client.perms[command.conf.permLevel]) return;
			console.log(command.conf.permLevel);
			message.channel.send(`${command.help.name} \nDescription: ${command.help.description}\nUsage: ${command.help.usage}\n${command.conf.permLevel == 'User' ? "" : `Required Permissions: ${command.conf.permLevel}`}`, {
				code: 'asciidoc',
			});
		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['h', 'halp'],
	permLevel: 'User',
};

exports.help = {
	name: 'help',
	category: 'System',
	description: 'Displays all the available commands for your permission level.',
	usage: 'help, help [command]',
};