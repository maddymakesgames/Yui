exports.run = async (client, message, args) => {
if(!args || args.size < 1 || args == null)return message.reply("Must provide a command name to reload.")
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  message.reply(`The command ${args[0]} has been reloaded`);
}


module.exports.config = {
  name: "Restart",
  help: "Restarts the bot. Bot creator only!",
  usage: "Only the owner can use this.",
  command: "restart"
}
