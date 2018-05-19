const {RichEmbed} = require('discord.js');
const Page = require('./page.js');

const AbstractClassError = require('./AbstractClassError');
module.exports = class command {
	constructor(name, file, description, category, alieses, options){
		this.name = name;
		this.description = description || "No Info Provided";
		this.category = category || "General";
		this.file = file;
		this.options = options;
		this.alieses = alieses;
		if (!file) throw new Error(`${this.constructor.name} does not provide a file to load it from`);
	}

	run() {
		throw new AbstractClassError(`${this.constructor.name} has not defined a run method`);
	}

	getHelp() {
		return {'name':this.name, 'desctription':this.description, 'help':this.help};
	}

	pageinate(data, message, member, embed = new RichEmbed(), options, optionsCallback) {
		const page = new Page(message, member, embed, data, options);
		page.start();
	}

	
}