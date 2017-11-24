exports.run = (client, message, args) => {
    const author = message.author.id;
    const settings = client.settings.get(message.guild.id);

    const credits = client.credits.get(author) || {credits: 0};

    message.channel.send(`${message.author} you have ${credits.credits} credits`);
    if(settings.debug == true){
    message.channel.send(JSON.stringify(credits));
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
    };
  
  exports.help = {
    name: "credits",
    category: "User",
    description: "Shows how many credits you have.",
    usage: "credits"
     };