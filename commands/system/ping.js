exports.run = async (client, message, args) => {


  const msg = await message.channel.send("ping");
  msg.edit(`Pong! \`${msg.createdTimestamp - message.createdTimestamp}\`ms`);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "System",
  description: "It pings. Then it pongs. But its not ping pong",
  usage: "ping"
};
