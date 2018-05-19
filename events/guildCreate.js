// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
	

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
