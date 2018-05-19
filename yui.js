// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');

// Load up the discord.js library
const Discord = require('discord.js');
// We also load the rest of the things we need in this file:
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
// const Hjson = require('hjson');
require('hjson/lib/require-config');

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.
const client = new Discord.Client();


const winston = require('winston');
client.logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log.log' }),
	],
});

// Here we load the config file that contains our token and our prefix values.
client.config = require('./config.hjson');
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require('./modules/functions.js')(client);
require('./modules/photoFunctions.js')(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();

// Now we integrate the use of Evie's awesome Enhanced Map module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
client.settings = new Enmap({ provider: new EnmapLevel({ name: 'settings' }) });
client.ranks = new Enmap({ provider: new EnmapLevel({ name:'ranks' }) });
client.points = new Enmap({ provider: new EnmapLevel({ name: 'points' }) });
client.serverPoints = new Enmap({ provieder: new EnmapLevel({ name: 'serverPoints' }) });
client.credits = new Enmap({ provider: new EnmapLevel({ name: 'credits' }) });
client.userProfiles = new Enmap({ provider: new EnmapLevel({ name: 'userProfiles' }) });
client.timeouts = new Enmap({ provider: new EnmapLevel({ name: 'Timeouts' }) });

client.log('testing?!?!?!?');
client.error('just testing...');

const walkSync = function(dir, filelist) {
	const path = require('path');
	const fs = require('fs'),
		files = fs.readdirSync(dir);
	filelist = filelist || [];
	files.forEach(function(file) {
		if (fs.statSync(path.join(dir, file)).isDirectory()) {
			filelist = walkSync(path.join(dir, file), filelist);
		}
		else {
			filelist.push(path.join(dir, file));
		}
	});
	return filelist;
};


const init = async () => {
	const datems1 = new Date().getUTCMilliseconds();
	let cmdFiles = [];
	cmdFiles = walkSync('./commands/', cmdFiles);
	client.cmdFiles = cmdFiles;
	client.log('log', `Loading a total of ${cmdFiles.length} commands.`);
	cmdFiles.forEach(f => {
		if (!f.endsWith('.js')) return;
		const response = client.loadCommand(f);
		if (response) console.log(response);
	});
	// Then we load events, which will include our message and ready event.
	const evtFiles = await readdir('./events/');
	client.log('log', `Loading a total of ${evtFiles.length} events.`);
	evtFiles.forEach(file => {
		const eventName = file.split('.')[0];
		const event = require(`./events/${file}`);
		// This line is awesome by the way. Just sayin'.
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});

	client.on('error', async (e) => {
		init();
		console.error(e);
	});

	console.log('Loading perms.js');
	client.perms = require('./modules/perms.js')(client);
	console.log('Logging in...');
	const datems = new Date().getUTCMilliseconds();
	client.login(client.config.token);
	const datems2 = new Date().getUTCMilliseconds();
	console.log(`It took ${datems2 - datems} ms to login and ${datems2 - datems1} ms to boot up entirely`);
	client.bootTime = datems;
};

init();