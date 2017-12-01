exports.run = async (client,message,args) => {
	var lvl = parseInt(args[0]);
	client.lvlUp(client, message, lvl);
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`lvlup`],
	permLevel: "Contributors"
  };
  
  exports.help = {
	name: 'levelup',
	category: "Debug",
	description: 'Emulates a level up without actually leveling up.',
	usage: 'levelup <level>'
  };