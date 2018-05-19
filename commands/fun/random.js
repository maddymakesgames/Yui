exports.run = async (client, message) => {
	// message.channel.send("test");
	const randomResponce = {
		'responce': {
			1:'Beam me up scotty',
			2:'This. Is. SPARTA!',
			3:'Oh hai Mark',
			4:'Not the bees!',
			5:'How could this happen to me!',
			6:'Do a barrel roll!',
			7:'( ͡° ͜ʖ ͡°)',
		},
	};
	const randobj = randomResponce['responce'];
	let count = 0;
	for(const i = 0; i < randomResponce.) {
		count++;
	}
	const rand13 = Math.floor(Math.random() * count) + 1;
	for(const prop in randobj) {
		if(prop == rand13) {
			message.channel.send(randobj[prop]);
		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['rand', 'randr', 'rr'],
	permLevel: 'User',
};

exports.help = {
	name: 'random',
	category: 'Fun',
	description: 'Give you a random outdated meme.',
	usage: 'random',
};
