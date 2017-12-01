exports.run = async (client, message) => {
  var author = message.author.id;
  var score = client.serverPoints.get(message.guild.id) || {[author]:{ points: 0}};
  message.channel.send(`${message.author} you have ${score[author].points} points on this server.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Spoints,spoints"],
  permLevel: "User"
};

exports.help = {
  name: "serverpoints",
  category: "User",
  description: "Shows your points on your current server.",
  usage: "serverpoints"
};
