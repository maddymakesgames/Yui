exports.run = async (client, message, args) => {
	let amount;
	const target = client.isUser(args.slice(3).join(' ')) || message.mentions.users.first() || message.author;
	console.log(`${target}   ${target.id}`);
	let credits = client.credits.get(target.id);
	const points = client.points.get(target.id);
	if(args.length >= 3) {
		amount = parseInt(args[2]);
	}
	else{
		amount = 0;
	}
	if(args[0] == 'set') {
		if(args[1] == 'credits') {
			credits = { credits:amount };
			client.credits.set(target.id, credits);
			message.channel.send(`${target.username} now have ${credits.credits} credits. Want proof? Here: ${JSON.stringify(credits)}`);
		}
		else if(args[1] == 'points') {
			points.points = amount || 0;
			client.points.set(target.id, points);
			message.channel.send(`${target.username} now have ${credits.credits} points. Want proof? Here: ${JSON.stringify(points)}`);
		}
		else if(args[1] == 'level') {
			points.level = amount || 0;
			points.points = 0;
			client.points.set(target.id, points);
			message.channel.send(`${target.username} now are level ${credits.credits}. Want proof? Here: ${JSON.stringify(points)}`);
		}
		else{
			message.channel.send('Please imput a valid setting to set.');
		}
	}
	else if(args[0] == 'give') {
		if(args[1] == 'credits') {
			credits.credits += amount;
			client.credits.set(target.id, credits);
			message.channel.send(`${target.username} now have ${credits.credits} credits. Want proof? Here: ${JSON.stringify(credits)}`);
			console.log(credits);
		}
		else if(args[1] == 'points') {
			points.points += amount || 0;
			client.points.set(target.id, points);
			message.channel.send(`${target.username} now have ${credits.credits} points. Want proof? Here: ${JSON.stringify(points)}`);
		}
		else if(args[1] == 'level') {
			points.level += amount || 0;
			points.points = 0;
			client.points.set(target.id, points);
			message.channel.send(`${target.username} now are level ${credits.credits}. Want proof? Here: ${JSON.stringify(points)}`);
		}
		else{
			message.channel.send('Please imput a valid setting to add to.');
		}
	}
	else{
		message.channel.send(`**${message.author.username}**, Please use set or give and then the perameter you want to edit.`);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['cheat'],
	permLevel: 'Contributors',
};

exports.help = {
	name: 'cheat',
	category: 'Debug',
	description: 'Gives an amount or sets one of your user variables.',
	usage: 'cheat <set or give> <variable> <amount>',
};