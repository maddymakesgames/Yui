exports.run = async (client, message) => {
	const Page = require('../../typings/page.js').default;
	const { RichEmbed } = require('discord.js');
	let embed = new RichEmbed()
		.setTimestamp()
		.setColor('AA00FF')
		.setFooter(`Command run by ${ message.member.nickname || message.author.username }`, message.author.displayAvatarURL)
		.setTitle('Settings')
		.setDescription('🛠 - React with tools to edit settings. \n 👁 - react with eyes to view current settings.');
	const msg = await message.channel.send(embed);
	await msg.react('👁');
	await msg.react('🛠');
	const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id && (reaction.emoji.name === '👁' || reaction.emoji.name === '🛠'), { time: 30000 });
	collector.on('collect', async (reaction) => {
		if(reaction.emoji.name === '🛠') {
			// do the edit stuff here.
			// const settings = client.settings.get(message.guild.id);
		}
		else if (reaction.emoji.name === '👁') {
			console.log('view was selected');
			const settings = client.settings.get(message.guild.id);
			// do the view stuff here.
			embed = new RichEmbed()
				.setTitle(`Showing page {{ currentPage }} of settings for ${ message.guild.name }`)
				.setTimestamp()
				.setColor('AA00FF')
				.setFooter(`Command run by ${message.member.nickname || message.author.username}`, message.author.displayAvatarURL);

			const page = new Page(msg, message.member, embed, settings, { 'itemsPerPage': 8, 'title': `Showing page {{currentPage}} of settings for ${message.guild.name}` });
			await page.start();
		}
	});
	collector.on('end', async (collected, reason) => {
		msg.clearReactions();
		console.log(`Settings collector ended because ${reason}`);
		if (reason === 'time' && collected.array().length < 1) setTimeout(() => msg.edit('Settings menu closed due to inactivity.', new RichEmbed()), 300);
	});
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 'Server Owner',
};

exports.help = {
	name: 'settings',
	category: 'System',
	description: 'Changes the settings for the guild.',
	usage: 'settings',
};