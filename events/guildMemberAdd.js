// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
	const config = client.config;
	// Load the guild's settings
	const settings = client.settings.get(member.guild.id);

	const profile = client.userProfiles.get(member.id);
	if (!(profile) || profile == undefined) {
		client.userProfiles.set(member.id, config.defaultProfile);
	}

	// If welcome is off, don't proceed (don't welcome the user)
	if (settings.welcomeEnabled !== true) return;

	// Replace the placeholders in the welcome message with actual data
	let welcomeMessage = settings.welcomeMessage.replace('{{user}}', member.user.tag);
	welcomeMessage = welcomeMessage.replace('{{server}}', member.guild.name);

	// Send the welcome message to the welcome channel
	// There's a place for more configs here.
	const channel = member.guild.channels.find(channle => channle.name === settings.welcomeChannel);
	if(channel) channel.send(welcomeMessage).catch(console.error);

	if(settings.dmWelcomeEnabled == true) {
		let dmWelcomeMessage = settings.dmWelcomeMessage.replace('{{user}}', member.user);
		dmWelcomeMessage = dmWelcomeMessage.replace('{{server}}', member.guild.name);
		member.send(dmWelcomeMessage);
	}
};