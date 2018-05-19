module.exports = async client => {

	// const DBL = require('dblapi.js');
	// const dbl = new DBL('mfa_Fake_Token_safe');

	// Why await here? Because the ready event isn't actually ready, sometimes
	// guild information will come in *after* ready. 1s is plenty, generally,
	// for all of them to be loaded.
	await client.wait(1000);

	// setInterval(() => {
	// 	const randNumb = client.randInt(1, 4);
	// 	switch(randNumb) {
	// 	case 1:
	// 		client.user.setPresence({ status: 'online', game: { name: `${client.guilds.size} servers.` } });
	// 		break;
	// 	case 2:
	// 		client.user.setPresence({ status: 'online', game: { name: `${client.users.array().length} users.` } });
	// 		break;
	// 	case 3:
	// 		client.user.setPresence({ status: 'online', game: { name: 'y!help for help' } });
	// 		break;
	// 	case 4:
	// 		client.user.setPresence({ status: 'online', game: { name: 'version 0.1' } });
	// 	}
	// 	console.log(`changing the presence to ${randNumb}`);
	// }, 75000);


	// Both `wait` and `client.log` are in `./modules/functions`.
	client.log('log', `${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'Ready!');

	// We check for any guilds added while the bot was offline, if any were, they get a default configuration.
	client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings));
	const readyTime = new Date().getUTCMilliseconds();
	console.log(`Took ${readyTime - client.bootTime} ms to get ready.`);
};
