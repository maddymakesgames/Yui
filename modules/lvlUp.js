module.exports = (client) => {
	client.lvlUp = (client, message, lvl) => {
		var URL = message.author.avatarURL; 
		const jimp = require('jimp');
		jimp.read(`./photos/lvl_up_bckgroung.png`, function (err, image) {
			jimp.read(URL, function (err, image1) {
				jimp.read(`./photos/lightGrey.jpg`, function (err, bckgrnd) {
					jimp.loadFont(`./fonts/Comfortaa-regular-43.fnt`).then(function (font) {
						image.composite(bckgrnd.resize(450,450), 175, 125)
							 .composite(image1.resize(400,400), 200,150)
							 .print(font, 125, 625, `Level Up!`)
							 .print(font, 250, 800, `Lvl.${lvl}`)
							 .getBuffer(jimp.AUTO, function (err, buffer) {
							message.channel.send("", {files:[{attachment: buffer}]});
						});	
					});
				});	
			});
		});
	}
}

