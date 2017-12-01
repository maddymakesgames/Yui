exports.run = async(client, message, args) => {
	var user = client.isUser(args[0]) || message.author; 
	var displayName = user.nickname || user.username;
	if (args.length <= 0) {
		user = message.author;
		message.channel.send(user.toString());
		await client.displayProfile(client, message, user);
		return;
	}else{
	}
	
	if (user != false) {
		message.channel.send(`Showing the profile for ${displayName}.`);
		await client.displayProfile(client, message, user);
	} else {
		message.channel.send(`${message.author} please input a valid username or nickname.`);
	}
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
}

exports.help = {
	name: "profile",
	category: "User",
	description: 'Sends the use\'s profile.',
	usage: 'proflie or profile <username or nickname>'
}