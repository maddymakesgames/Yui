exports.run = async (client, message, args) => {

const config = require("../json files/config.json");

  if(message.member.roles.has(Owner.id) || message.author.id == config.Owner){
  let newMessage = args
  config.Lmessage = newMessage;
  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
  message.channel.send(config.Lmessage);
}
else{
message.channel.send("Insufficent Premissions")
}
}


module.exports.config = {
  name: "Message Leave Set",
  help: "Sets the message sent when a user leaves or gets kicked.",
  usage: "lmessage <message>",
  command: "lmessage"
}
