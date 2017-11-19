
const config = require("../json files/config.json");
exports.run = async (client, message, args) => {

  if(message.member.roles.has(Owner.id) || message.author.id == config.Owner){
  let newMessage = args;
  config.Jmessage = newMessage;
//writes new welcome message
  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
  message.channel.send(config.Jmessage);
}
else{
message.channel.send("Insufficent Permissions")
}
}


module.exports.config = {
  name: "Message join Set",
  help: "Sets the message sent when a user joins.",
  usage: "jmessage <message>",
  command: "jmessage"
}
