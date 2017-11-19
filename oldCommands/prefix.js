exports.run = async (client, message, args) => {

const fs = require('fs');
const config = require("../json files/config.json");


  if (message.member.roles.has(config.OwnerID) || message.author.id == config.Owner) {
    if(args.length < 1){
      message.channel.send("**__You need to put a new prefix or you will f*ck everything up!__**")
    }
    else{
  // Gets the prefix from the command (eg. "/prefix +" it will take the "+" from it)
  let newPrefix = args;
  // change the configuration in memory
  config.prefix = newPrefix;
  message.channel.send("prefix = " + config.prefix + "  " + newPrefix);
  // Now we have to save the file.
  fs.writeFile("../json files/config.json", JSON.stringify(config), (err) => console.error);
}
}
else{
  message.channel.send("Insufficent Permissions")
}
}


module.exports.config = {
  name: "Prefix",
  help: "Change's the command prefix.",
  usage: "prefix <prefix>",
  command: "prefix"
}
