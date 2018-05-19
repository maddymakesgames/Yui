// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
	const dblApi = require('discord-bot-list');
	const dbl = new dblApi({
		'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2NzE1MTE2ODg2Mzk5Mzg1NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE1Mjg1NzkyfQ.ZptBrQnLCWqkkE9lN8f7GC0x71_kN1yRpDD8ssVpK9g',
		'id': '367151168863993856',
	});
	dbl.postStats(client.guilds.size, (err, res) => {
		if (err) {
			console.error(err);
		}
		else {
			console.log(res);
		}
	});

	client.user.setPresence({ status: 'online', game: { name: `${client.guilds.size}` } });
	// We need to add this guild to our settings!
	if(client.settings.get(guild.id) == undefined) {
		client.settings.set(guild.id, client.config.defaultSettings);
	}
	/* else{
		const settings = client.settings.get(guild.id);
		guild.channels.find('name', settings.GeneralChannel).send('Thanks for letting me back in your server!').catch(console.error);
	} */
};
