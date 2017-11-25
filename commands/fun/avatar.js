const snekfetch = require('snekfetch');
const jimp = require(`jimp`);

exports.run = async (client, message, args) => {
	var URL = message.author.avatarURL;
	jimp.read(URL, function (err, image) {
		image.getBuffer(jimp.AUTO, function (err, mime) {
			message.channel.send("", {files:[{attachment: mime}]});
		});
	});
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
  };
  
  exports.help = {
	name: 'avatar',
	category: "Fun",
	description: 'Sends the use\'s avatar.',
	usage: 'avatar'
  };