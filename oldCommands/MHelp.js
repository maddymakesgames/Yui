exports.run = async (client, message, args) => {
  const fs = require("fs");
  const Discord = require("../discord-music-bot/node_modules/discord.js");
  const mcmds = require("../json files/MHelp.json");

  //help = fs.readFile('./json files/help.json')
  var cmdnames = [];
  var pushnumber = 0;
   if(args.length < 1){
  while(pushnumber < mcmds.commands.length){
    cmdnames.push(mcmds.commands[pushnumber])
   pushnumber = pushnumber + 1;
  }
    message.channel.send("`" + cmdnames + "`")
   }
    else{
      var helps = mcmds["MHelps"]
     for(var prop in helps){
       if(args == prop){
         message.channel.send("``" + mcmds.MHelps[prop][0] + "\n usage: " + mcmds.MHelps[prop][1] + "\n" + mcmds.MHelps[prop][2] + "``")
       }
     }
   }
  // message.channel.send("sent");

}
module.exports.config = {
  "command":"mhelp"
}
