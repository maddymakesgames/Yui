const Trello = require('node-trello');
const t = new Trello('4605068f465dc4daee244286d57c9b7a', '2907e379a593a12ba8535645ad7ba06933132fd86056475b5a2aee779916bf46');
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
	if (args[0] == 'list' || args[0] == 'show' || args[0] == 'all') return message.channel.send('Here is a link to the trello boards where suggestions and bugs are loaded: https://trello.com/b/B1TABoVp');
	if(client.timeouts.get(message.author.id)) return;
	args = args.join(' ').split('|');
	if(!args[1]) return message.channel.send(`${message.member.displayName} you need to give a short title of the suggestion, and a description of the suggestion.`);
	const msg = await message.channel.send('Here is what you are about to send. Are you sure you want to send this? https://trello.com/b/B1TABoVp', new Discord.RichEmbed().setTitle(args[0]).setDescription(args[1]));
	msg.react('✅');
	msg.react('❌');
	const coll = msg.createReactionCollector((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '❌' || reaction.emoji.name == '✅'));
	coll.on('collect', (reaction) => {
		if (reaction.emoji.name == '✅') {
			t.get('1/members/me/boards', function(err, data) {
				if(err) throw err;
				console.log(data);
				const filtered = data.filter(board => board.name.toLowerCase() == 'yui bot');
				const board = filtered[0];
				t.get(`1/boards/${board.id}/lists`, function(err, lists) {
					console.log(lists);
					const filteredList = lists.filter(list => list.name.toLowerCase() == 'suggestions');
					const list = filteredList[0];
					console.log(list);
					t.post('1/cards', { name: args[0], desc: args[1], idList: list.id }, function(err, res) {
						console.log(err || res);
						msg.edit('Suggestion succesfully sent.');
					});
				});
			});
			client.timeouts.set(message.author.id, true);
			setTimeout(() => client.timeouts.set(message.author.id, false), 300000);
		}
		else {
			msg.edit('Okay suggestion not sent.');
		}
		coll.stop();
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'Bot Owner',
};

exports.help = {
	name: 'suggest',
	category: 'System',
	description: 'Suggests a feature.',
	usage: 'suggest [name]',
};