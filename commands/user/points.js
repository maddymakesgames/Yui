exports.run = async (client, message) => {
  const author = message.author;
  const points = client.points.get(author.id) || { points: 0, level: 1 };
  message.channel.send(`${author} you have ${points.points} points and are level ${points.level}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "points",
  category: "User",
  description: "Shows your total point and level.",
  usage: "points"
};
