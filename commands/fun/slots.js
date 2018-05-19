exports.run = async (client, message, args) => {
	const author = message.author.id;
	const credits = client.credits.get(author) || { credits:0 };
	let amount = args[0];
	let money = credits.credits;
	if(args.length > 0) {
		amount = args[0];
	}
	else{
		amount = 1;
	}
	if(money < amount) {
		message.channel.send(`You don't have ${amount} credits`); return;
	}
	else{
		money -= amount;
		const jackpot = amount * 25;
		const triple7s = amount * 15;
		const double7s = amount * 9;
		const single7 = amount * 2;
		const secondPrize = amount * 4;
		const firstPrize = amount * 2;

		const slotsObj = {
			'slots':{
				0:':flag_lv:',
				1:':melon:',
				2:':apple:',
				3:':watermelon:',
				4:':tangerine:',
				5:':bell:',
				6:':cherries:',
				7:':gem:',
			},
		};

		const msg = await message.channel.send('**Slot [:slot_machine:] Machine**\n');

		const n = [];
		const l = [];
		const weight = [0, 1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7];
		let output = '';
		const slotsProps = slotsObj['slots'];
		for(let i = 0; i < 5; i++) {
			for(let e = 0; e < 9; e++) {
				n[e] = await weight.random();
				for(const prop in slotsProps) {
					if(n[e] == prop) l[e] = slotsProps[prop];
				}
				if((e + 1) % 3 == 0) {

					output += l[e];
					output += '\n';
				}
				else{
					output += l[e];
					output += '|';
				}

			}
			await msg.edit(`**Slot [:slot_machine:] Machine**\n ${output}`);
			output = '';

		}
		if(l[3] == l[4] && l[3] == l[5]) {
			const wmsg = await message.channel.send('You Win!!!');

			if(n[3] == 7) {
				money += jackpot;
				wmsg.edit(`**${message.author.username}**, You Win ${jackpot} credits!!`);
			}
			else if(n[3] == 6) {
				money += triple7s;
				wmsg.edit(`**${message.author.username}**, You win ${triple7s} credits!!`);
			}
			else if(n[3] == 4) {
				money += firstPrize;
				wmsg.edit(`**${message.author.username}**, You Win ${firstPrize} credits!!`);
			}
			else if(n[3] != 0) {
				money += secondPrize;
				wmsg.edit(`**${message.author.username}**, You Win ${secondPrize} credits!!`);
			}
		}
		else if(l[3] == l[4] && n[4] == 6 || l[4] == l[5] && n[4] == 6) {
			const wmsg = await message.channel.send('You Win!!!');
			money += double7s;
			wmsg.edit(`**${message.author.username}**, You Win ${double7s} credits!!`);
		}
		else if(n[3] == 6 || n[4] == 6 || n[5] == 6) {
			money += single7;
			message.channel.send(`**${message.author.username}**, You Win ${single7} credits!!`);

		}
		else{
			message.channel.send(`**${message.author.username}** You lost :(`);

		}

		credits.credits = money;

		client.credits.set(author, credits);
	}
};


exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'User',
};

exports.help = {
	name: 'slots',
	category: 'Fun',
	description: 'Use an amount of credits to give a chance to win a large amount of credits.',
	usage: 'slots <a amount of credits. Leave blank to use one>',
};
