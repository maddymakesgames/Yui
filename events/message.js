// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = async (client, message) => {
	try {
	// console.log(typeof message);
	// It's good practice to ignore other bots. This also makes your bot ignore itself
	// and not get into a spam loop (we call that "botception").
		if(message.author.bot) return;

		if ((message.content.includes('sex')) && message.guild.id == 379450197257879562) {
			message.channel.send('Ha ha sex joke.');
		}

		await client.pointsMonitor(message);
		client.serverPointsMonitor(message);
		// Grab the settings for this server from the PersistentCollection
		// If there is no guild, get default conf (DMs)
		const settings = message.guild
			? client.settings.get(message.guild.id)
			: client.config.defaultSettings;

		// For ease of use in commands and functions, we'll attach the settings
		// to the message object, so `message.settings` is accessible.
		message.settings = settings;

		let prefix = false;
		// Also good practice to ignore any message that does not start with our prefix,
		// which is set in the configuration file.
		for(const prop of settings.prefix) {
			if (message.content.indexOf(prop) == 0) prefix = prop;
		}
		if(!prefix) return;
		// Here we separate our "command" name, and our "arguments" for the command.
		// e.g. if we have the message "+say Is this the real life?" , we'll get the following:
		// command = say
		// args = ["Is", "this", "the", "real", "life?"]
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		// Get the user or member's permission level from the elevation
		const level = client.permlevel(message);
		console.log(level.level);
		// Check whether the command, or alias, exist in the collections defined
		// in app.js.
		const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
		// using this const varName = thing OR otherthign; is a pretty efficient
		// and clean way to grab one of 2 values!
		if (!cmd && !client.wasIMentioned(message)) return;

		message.author.permLevel = level;

		// Some commands may not be useable in DMs. This check prevents those commands from running
		// and return a friendly error message.
		if (cmd && !message.guild && cmd.conf.guildOnly) return message.channel.send('This command is unavailable via private message. Please run this command in a guild.');
		console.log(await client.canIRun(cmd, message));
		if (!await client.canIRun(cmd, message)) {
			if (settings.systemNotice === 'true') {
				return message.channel.send('You do not have permission to use this command.');
			}
			else {
				return;
			}
		}
		// Sends a debug message when a command is detected if debug mode is on
		if(settings.debug == true) {
			let msg = await message.channel.send(JSON.stringify(cmd));
			if(args.length > 0) {
				for(let i = 0; i < args.length; i++) {
					msg = msg.edit(msg.content + ' ' + args[i]);
				}
			}
		}
		// To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
		// The "level" command module argument will be deprecated in the future.

		message.flags = [];
		while (args[0] && args[0][0] === '-') {
			message.flags.push(args.shift().slice(1));
		}
		// If the command exists, **AND** the user has permission, run it.
		client.log('log', `${client.perms.find(l => l.level === level.level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, 'CMD');
		cmd.run(client, message, args);
	}
	catch(e) {
		client.error(e);
	}
};