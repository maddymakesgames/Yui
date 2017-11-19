exports.run = async (client, message, args) => {
const fs = require("fs");
const Discord = require("../discord-music-bot/node_modules/discord.js");
const cmds = require("../json files/cmdnames.json");


 if(args.length < 1){
  var catagories = new Array();
  var msg = "";
  var i = 0;
  for(var prop in cmds["commands"]){
    catagories[i] = new Array();
    catagories[i][i] = cmds["commands"][prop];
    catagories[i] = cmds["commands"];
    console.log(cmds["commands"][prop]);
    console.log(catagories);
    //.console.log(catagories[i])
    i++;
  }
  var i = 0;
  for(var prop in catagories){
    msg += "\n"+catagories.indexOf(catagories[prop])+"\n";
    var e = 0;
    for(var props in catagories[prop]){
    if(e == 0){
      msg +=  "`"+catagories[prop][props]+"`";
    }
    else{
      msg += ", `"+catagories[prop][props]+"`";
    }
    e++;
  }
  i++;
}
  message.channel.send(msg);
 }
  else{
    var helps = cmds["helps"]
   for(var prop in helps){
     if(args == prop){
       message.channel.send("```" + cmds.helps[prop][0] + "\n usage: " + cmds.helps[prop][1] + "\n" + cmds.helps[prop][2] + "```")
     }
   }
 }
// message.channel.send("sent");
}

module.exports.config = {
  command: "help"
}
