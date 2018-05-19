
const { RichEmbed } = require('discord.js');
class Page {
	/**
	 * Creates a pagified embed
	 * @param {Discord.message} message The message to put the embed in.
	 * @param {Discord.user} author The person who run the command.
	 * @param {Discord.RichEmbed} embed The base embed to add the data to.
	 * @param {Object} data The data to be displayed in the embed.
	 * @param {Object} options The options for the page. Consists of the items per page, the title and whether or not to make the data into options you can select.
	 */
	constructor(message, member, embed = new RichEmbed(), data = {}, options = { 'itemsPerPage' : 8, 'title' : null, 'hasOptions':false}, callback = function(){null}) {
		this.ePerPage = options.itemsPerPage || 8;
		this.numOfPages = Math.ceil(Object.keys(data).length / this.ePerPage);
		this.pages;
		this.currentPage = 0;
		this.title = options.title || null;
		this.message = message;
		this.embed = embed;
		this.member = member;
		this.author = member.user;
		this.hasOptions = options.options;
		this.readData(data);
		this.callback = callback;
	}

	/**
	 * Reads the data provided into pages.
	 * @param {Object} data The data to put into the pages.
	 */
	readData(data) {
		this.pages = {};
		let cache = [];
		const dataKeys = Object.keys(data);
		for (let e = 0; e < this.numOfPages; e++) {
			cache = [];
			for (let p = 0; p < this.ePerPage; p++) {
				if (dataKeys[p + (e * this.ePerPage)] != undefined) cache[p] = [dataKeys[p + (e * this.ePerPage)], data[dataKeys[p + (e * this.ePerPage)]]];
			}
			this.pages[e] = cache;
		}
	}

	createEmbed(embed, title = null) {
		if(title == null) {embed.setTitle(`Page ${this.currentPage + 1}:`);}
		else {
			console.log();
			title = title.replace('{{currentPage}}', this.currentPage + 1);
			embed.setTitle(title);
		}
		for (const prop in this.pages[this.currentPage]) {
			if(this.pages[this.currentPage][prop][0] != undefined) embed.addField(this.pages[this.currentPage][prop][0], `\`${this.pages[this.currentPage][prop][1]}\``);
		}
		return embed;
	}

	async updatePage(direction) {
		if(direction != 'start') {
			this.currentPage = (direction.toLowerCase() == 'forward' || direction.toLowerCase() == 'next') ? this.currentPage + 1 : this.currentPage - 1;
		}
		// Create a blank embed, set its color, and then run createEmbed with the title set to either null or the custom title.
		let embed = new RichEmbed()
			.setColor(this.embed.color)
			.setFooter(`${this.member.nickname || this.author.username}#${this.author.discriminator}`)
			.setTimestamp(this.embed.timestamp);
		embed = this.createEmbed(embed, this.title || null);
		this.message = await this.message.edit(embed);
	}

	async start() {
		// Setup the reaction listener.
		await this.message.clearReactions();
		if(this.hasOptions) return await this.startOptions();
		const pageCollector = this.message.createReactionCollector((reaction, user) => (reaction.emoji.name == '⬅' || reaction.emoji.name == '➡') && user.id == this.author.id);
		// Tell the reaction collector what to do when it detects a reaction.
		pageCollector.on('collect', async (reaction) => {
			if (reaction.emoji.name == '➡' && this.currentPage < this.numOfPages - 1) await this.updatePage('next');
			if (reaction.emoji.name == '⬅' && this.currentPage > 0) await this.updatePage('back');
			await this.message.clearReactions();
			if (this.currentPage < this.numOfPages - 1) this.message.react('➡');
			if (this.currentPage > 0) this.message.react('⬅');
		});
		// Tell the reaction collector to remove all reactions when it stops collecting them.
		pageCollector.on('end', async () => {
			await this.message.clearReactions();
		});

		// Change the embed
		await this.updatePage('start');
		if (this.currentPage < this.numOfPages - 1) this.message.react('➡');
		if (this.currentPage > 0) this.message.react('⬅');
	}

	async startOptions(returnListener = false) {
		const actions = [':ten:', ':nine', ':eight:', ':seven:', ':six:', ':five:', ':four:', ':three:', ':two:', ':one:', '➡', '⬅'].splice(0, this.ePerPage - 2);
		const listener = this.message.createReactionCollector((reaction, user) => actions.includes(reaction.name) && user.id == this.author.id);
		for(let i = 0; i < actions.length; i++) {
			this.message.react(actions[i]);
		}
		if(returnListener) return listener;
		else if(!this.callback) throw new Error('For a page to have options you have to either return the listener or provided a callback in the constructor.');
		else {
			listener.on('collect', async (reaction) => this.callback(reaction));
		}
	}
}
module.exports = Page;