module.exports = (client) => {
	client.lvlUp = (client, message, lvl) => {
		var URL = message.author.avatarURL;
		const jimp = require('jimp');
		jimp.read(`./photos/lvl_up_bckgroung.png`, function (err, image) {
			jimp.read(URL, function (err, image1) {
				jimp.read(`./photos/lightGrey.jpg`, function (err, bckgrnd) {
					jimp.loadFont(`./fonts/Comfortaa-regular-43.fnt`).then(function (font) {
						image.composite(bckgrnd.resize(450, 450), 175, 125)
							.composite(image1.resize(400, 400), 200, 150)
							.print(font, 125, 625, `Level Up!`)
							.print(font, 250, 800, `Lvl.${lvl}`)
							.resize(100, 125)
							.getBuffer(jimp.AUTO, function (err, buffer) {
								message.channel.send("", {
									files: [{
										attachment: buffer
									}]
								});
							});
					});
				});
			});
		});
	}
	client.displayProfile = (client, message, user) => {
		var config = client.settings.get(message.guild.id);
		const points = client.points.get(message.author.id);
		const canvas = require('canvas-constructor');
		//const settings = client.settings.get(message.guild.id);
		userProfile = client.userProfiles.get(user.id);
		if (!(userProfile) || userProfile == undefined) {
			client.userProfiles.set(user.id, config.defaultProfile);
		}
		console.log(JSON.stringify(userProfile));
	}
}