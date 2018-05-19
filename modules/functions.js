module.exports = (client) => {

	/*
  PERMISSION LEVEL FUNCTION
  This is a very basic permission system for commands which uses "levels"
  "spaces" are intentionally left black so you can add them if you want.
  NEVER GIVE ANYONE BUT OWNER THE LEVEL 11! By default this can run any
  command including the VERY DANGEROUS `eval` and `exec` commands!
  */
	client.permlevel = message => {
		let permlvl = 0;
		const permOrder = client.perms.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);
		while (permOrder.length) {
			const currentLevel = permOrder.shift();
			// if (message.guild && currentLevel.guildOnly) continue;
			if (currentLevel.check(message)) {
				permlvl = currentLevel;
				break;
			}
		}
		return permlvl;
	};


	/*
  LOGGING FUNCTION
  Logs to console. Future patches may include time+colors
  */
	client.log = (msg, title) => {
		if (!title) title = 'Log';
		client.logger.log('info', `[Info] [${title}]${msg}`);
	};


	/*
  SINGLE-LINE AWAITMESSAGE
  A simple way to grab a single reply, from the user that initiated
  the command. Useful to get "precisions" on certain things...
  USAGE
  const response = await client.awaitReply(msg, "Favourite Color?");
  msg.reply(`Oh, I really love ${response} too!`);
  */
	client.awaitReply = async (msg, question, limit = 60000) => {
		const filter = m=>m.author.id = msg.author.id;
		await msg.channel.send(question);
		try {
			const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
			return collected.first().content;
		}
		catch (e) {
			return false;
		}
	};


	client.pointsMonitor = async (message) => {
		const guild = message.guild.id;
		const author = message.author.id;
		const settings = client.settings.get(guild);
		let prefix = false;
		for(const prop of settings.prefix) {
			if (message.content.indexOf(prop) == 0) prefix = prop;
		}
		if(message.content.startsWith(prefix)) return;
		const score = client.points.get(author) || { points: 0, level: 1 };
		const credits = client.credits.get(author) || { credits: 0 };
		score.points++;
		const curLevel = Math.floor(0.1 * Math.sqrt(score.points)) + 1;
		if (score.level < curLevel) {
			if (settings.lvlUpMessage == true) await client.lvlUp(message, curLevel);
			score.level = curLevel;
			credits.credits++;
			// console.log(credits);
		}
		client.points.set(author, score);
		client.credits.set(author, credits);
	};


	client.serverPointsMonitor = (message) => {
		const guild = message.guild.id;
		const author = message.author.id;
		const settings = client.settings.get(guild);
		let prefix = false;
		for(const prop of settings.prefix) {
			if (message.content.indexOf(prop) == 0) prefix = prop;
		}
		if(message.content.startsWith(prefix)) return;
		const score = client.serverPoints.get(guild) || { [author]:{ points: 0 } };
		if(score[author] === undefined) {
			score[author] = { points:1 };
		}
		else{
			score[author].points++;
		}
		client.serverPoints.set(guild, score);
		// console.log(score);
	};

	/*
  MESSAGE CLEAN FUNCTION
  "Clean" removes @everyone pings, as well as tokens, and makes code blocks
  escaped so they're shown more easily. As a bonus it resolves promises
  and stringifies objects!
  This is mostly only used by the Eval and Exec commands.
  */
	client.clean = async (text) => {
		if (text && text.constructor.name == 'Promise') {text = await text;}
		if (typeof evaled !== 'string') {
			text = require('util').inspect(text, { depth: 0 });
		}
		text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
			.replace(client.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0');

		return text;
	};

	client.loadCommand = (commandName) => {
		try {
			const props = require(`../${commandName}`);
			client.log('log', `Loading Command: ${props.help.name}`);
			if (props.init) {
				props.init(client);
			}
			client.commands.set(props.help.name, props);
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name);
			});
			return false;
		}
		catch (e) {
			return `Unable to load command ${commandName}: ${e}`;
		}
	};

	client.unloadCommand = async (commandName) => {
		let commandIndex;
		let command;
		if (client.commands.has(commandName)) {
			console.log('commands has commandName');
			console.log(client.aliases.keyArray());
			commandIndex = client.commands.keyArray().indexOf(commandName);
			command = client.commands.get(commandName);
		}
		else if (client.aliases.has(commandName)) {
			commandIndex = client.commands.Array().indexOf(commandName);
			for(const prop in client.commands) {
				let i = 0;
				if(prop.aliases.get(commandName)) {
					commandIndex = i;
				}
				else{
					i++;
				}
				// command = client.commands.indexOf(client.aliases.get(commandName));
			}
		}
		console.log(commandIndex);
		if (!commandIndex) return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;

		if (command.shutdown) {
			await command.shutdown(client);
		}
		console.log(client.cmdFiles[commandIndex]);
		delete require.cache[require.resolve(`../${client.cmdFiles[commandIndex]}`)];
		return false, client.cmdFiles[commandIndex];
	};

	/* MISCELANEOUS NON-CRITICAL FUNCTIONS */

	// EXTENDING NATIVE TYPES IS BAD PRACTICE. Why? Because if JavaScript adds this
	// later, this conflicts with native code. Also, if some other lib you use does
	// this, a conflict also occurs. KNOWING THIS however, the following 2 methods
	// are, we feel, very useful in code.

	// <String>.toPropercase() returns a proper-cased string such as:
	// "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
	client.randInt = (min, max) => {
		const Random = require('random-js');
		const random = new Random(Random.engines.mt19937().autoSeed());
		return random.integer(min, max);
	};

	String.prototype.toProperCase = function() {
		return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};

	// <Array>.random() returns a single random element from an array
	// [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
	Array.prototype.random = function() {
		const Random = require('random-js')();
		return this[Random.integer(0, this.length)];
	};

	// `await client.wait(1000);` to "pause" for 1 second.
	client.wait = require('util').promisify(setTimeout);

	client.isUser = (string) => {

		for(let i = 0; i < client.guilds.array().length; i++) {
			const server = client.guilds.array()[i];
			for(let e = 0; e < server.members.array().length; e++) {
				const member = server.members.array()[e];
				if(string == member.user.username || string == member.displayName) {
					return member.user;
				}
			}
		}
		return false;
	};

	String.prototype.toArray = function() {
		const StringArray = new Array();
		for (let i = 0; i < this.length; i++) {
			StringArray[i] = this.charAt(i);
		}
		return StringArray;
	};
	Array.prototype.toAlphaNumberic = function() {
		const AlphaNumeric = new Array();
		const testingString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 `~!@#$%^&*()_+-={}[]|\\:;"\'<,>.?/';
		const testingArray = testingString.toArray();
		for (let i = 0; i < this.length; i++) {
			if (typeof this[i] === 'string') {
				AlphaNumeric[i] = testingArray.indexOf(this[i]);
			}
			else if (typeof this[i] === 'number') {
				AlphaNumeric[i] = testingArray[this[i]];
			}
			else {
				AlphaNumeric[i] = null;
				console.log(`${this[i]} is not a string or a number and there for is now null. This value will be skipped over and will badly influence the training data.`);
			}
		}
		return AlphaNumeric;
	};
	String.prototype.toAlphaNumberic = function() {
		return this.toArray().toAlphaNumberic().join();
	};

	client.wasIMentioned = (message) => {
		const mentionedUsers = message.mentions.users;
		return mentionedUsers.has(client.user.id);
	};

	// These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
	process.on('uncaughtException', (err) => {
		const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
		client.error('Uncaught Exception: ', errorMsg);
		// Always best practice to let the code crash on uncaught exceptions.
		// Because you should be catching them anyway.
		process.exit(1);
	});

	process.on('unhandledRejection', err => {
		console.error('Uncaught Promise Error: ', err);
	});

	client.canIRun = (command, message) => {
		if(!command || !message) throw new Error('You need to give client.canIRun() and message and command');
		const level = message.author.permLevel;
		//console.log(level);
		//console.log(message.author.tag);
		if(message.channel.type === 'text') {
			for (let i = 0; i < client.perms.length; i++) {
				if (client.perms[i].level <= level.level && client.perms[i].name == command.conf.permLevel) {
					console.log(`${command.help.name} has passed the filter`);
					return true;
				}
			}
			return false;
		}
		else {
			for (let i = 0; i < client.perms.length; i++) {
				if (command.conf.permLevel <= level && client.perms[i].name == command.conf.permLevel && command.conf.guildOnly !== true) return true;
			}
			return false;
		}
	};

	client.filterCommands = async (message) => {
		const commandsICanRun = [];
		const level = message.author.permLevel;
		client.commands.array().forEach(cmd => {
			if(client.canIRun(cmd, message)) commandsICanRun.push(cmd);
		});
		return commandsICanRun;
	}

	client.isHex = (h) => {
		const a = parseInt(h, 16);
		return (a.toString(16) === h.toLowerCase());
	};


	client.error = (msg, title) => {
		if (!title) title = 'ERROR';
		client.logger.log('error', `[ERROR] [${title}]${msg}`);
	};

	client.numToReact = (num) => {
		if(num < 11 && num >= 0) {
			const units = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
			return `:${units[num]}:`;
		}
	};
};
