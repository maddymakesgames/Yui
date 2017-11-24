exports.run = async (client, message, [action, ...value], level) => {

  const settings = client.settings.get(message.guild.id);

  if(action === "add"){
    settings["prefix"].push(value.join(" "));

    client.settings.set(message.guild.id, settings);
    message.channel.send(`You have added the prefix ${value} to the list of prefixes`);
    client.settings.set(message.guild.id, settings);
  }
  else if(action === "delete"){
    var index = settings["prefix"].indexOf(value[0]);
    console.log(value[0]);
    console.log(index);
    console.log(settings["prefix"]);
    if(index > -1){
      settings["prefix"].splice(index, 1);
      message.channel.send(`You have deleted the prefix ${value} from the list of prefixes`);
      client.settings.set(message.guild.id, settings);
    }
  }
  else if(action === "list"){
    var msg = "The current prefixes for this server are: ";
    for(const prefixes of settings["prefix"]){
      msg += `${prefixes}, `;
    }
    message.channel.send(msg);
  }
  else{
    message.channel.send(`${message.author} please use list/add/delete to edit or list the server prefixes.`);
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["prefix", "p"],
  permLevel: "Administrator"
};

exports.help = {
  name: "prefix",
  category: "System",
  description: "View or change settings for your server.",
  usage: "prefix <list/add/delete> <prefix>"
};
