exports.run = async (client, message, args) => {

  const config = client.settings.get(message.guild.id);

      if(client.config.debug == true){
         config.debug = false;
        message.channel.send("debug mode turned off")
      }
      else {
        config.debug = true;
        message.channel.send("debug mode turned on")
      }


}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Contributors"
};

exports.help = {
  name: "debug",
  category: "Debug",
  description: "Turns on debug mode.",
  usage: "debug"
};
