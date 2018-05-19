module.exports = async (client, oldUser, newUser) => {

	if(oldUser.username !== newUser.username) {
		console.log(`${oldUser.username} has changed their username to ${newUser.username}`);
		const userGuilds = client.guilds.filter(guild => guild.members.has(newUser.id));
		userGuilds.array().forEach(guild => {
			console.log(`testing ${guild.name} for a colored role for ${newUser.username}`);
			const role = guild.roles.find('name', oldUser.tag);
			if(role) {
				role.setName(newUser.tag, `${newUser}`);
			}
		});
	}
};