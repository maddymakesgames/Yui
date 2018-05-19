module.exports = (client) => {
	const jimp = require('jimp');
	client.lvlUp = async (message, lvl) => {
		const URL = message.author.displayAvatarURL;
		const bckgrnd = await jimp.read('./photos/lvl_up_bckgroung.png');
		const image1 = await jimp.read(URL);
		const grey = await jimp.read('./photos/lightGrey.jpg');
		const font = await jimp.loadFont('./fonts/Comfortaa-regular-43.fnt');
		bckgrnd.composite(grey.resize(450, 450), 175, 125)
			.composite(image1.resize(400, 400), 200, 150)
			.print(font, 125, 625, 'Level Up!')
			.print(font, 250, 800, `Lvl.${lvl}`)
			.resize(100, 125)
			.getBuffer(jimp.AUTO, function(err, buffer) {
				message.channel.send('', {
					files: [{
						attachment: buffer,
					}],
				});
			});
	};
	client.displayProfile = (message, user) => {
		console.log(message.channel);
		const config = client.config;
		const points = client.points.get(user.id);
		let userProfile = client.userProfiles.get(user.id);
		if (!(userProfile) || userProfile == undefined) {
			client.userProfiles.set(user.id, config.defaultProfile);
			userProfile = client.userProfiles.get(user.id);
		}
		const image = new jimp(124, 248, 0xAA00FFFF, function(err, pimage) {
			for(let x = 0; x < 124; x++) {
				for(let y = 0; y < 248; y++) {
					if(x % 4 == 2 && y % 2 == 1) pimage.setPixelColor(0xAA00AAFF, x, y);
				}
			}
		});
		image.getBuffer(jimp.AUTO, (err, buffer) => message.channel.send('', {
			files: [{
				attachment: buffer,
			}],
		}));
	};

	client.watDis = async (message, user) => {
		const URL = user.displayAvatarURL;
		console.log(URL);
		let avatar;
		const peridot = await jimp.read('./photos/peridot.jpg').catch(err => console.error(err));
		await jimp.read(URL).then(jubjub => {
			console.log(`found JubJub ${jubjub}`);
			avatar = jubjub;
		}, err => console.log(`oop error getting avatar ${err}`));
		const font = await jimp.loadFont(jimp.FONT_SANS_64_WHITE).catch(err => console.error(err));
		console.log(avatar);
		peridot.composite(avatar.resize(150, 150), 345, 100);
		peridot.print(font, 100, 40, 'Wat Dis?')
			.getBuffer(jimp.AUTO, function(err, buffer) {
				message.channel.send('', { files: [{ attachment: buffer }] });
			});
	};
};
