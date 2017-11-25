const jimp = require(`jimp`);
exports.run = async (client, message, args) => {
	var URL = message.author.avatarURL;
	//console.log(avatar);
	jimp.read(`./photos/peridot.jpg`, function (err, image) {
			jimp.read(URL, function (err, image1) {
				jimp.loadFont(jimp.FONT_SANS_64_WHITE).then(function (font) {
					image.composite(image1.resize(150,150), 345,100)
					image.print(font, 100, 40, "Wat Dis?")
					.getBuffer(jimp.AUTO, function (err, buffer) {
						message.channel.send("", {files:[{attachment: buffer}]});
				});	
			});	
		});
	});
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`pointing`],
	permLevel: "User"
  };
  
  exports.help = {
	name: 'watdis',
	category: "Fun",
	description: 'Sends the use\'s avatar on a meme.',
	usage: 'pointing'
  };