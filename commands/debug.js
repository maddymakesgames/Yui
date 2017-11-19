exports.run = async (client, message, args) => {
  const config = require('../json files/config.json')
  const fs = require('fs')


      if(config.debug == true){
        client.debug = false;
        message.channel.send("debug mode turned off")
      }
      else {
        client.debug = true;
                message.channel.send("debug mode turned on")
      }


}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["d"],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "Debug",
  category: "Debug",
  description: "Turns on debug mode.",
  usage: "debug"
};
