exports.run = async (client, message, args) => {


  const msg = await message.channel.send("ping");
  msg.edit(`Pong! \`${msg.createdTimestamp - message.createdTimestamp}\`ms`);
}
module.exports.config = {
  command: "ping"
}
