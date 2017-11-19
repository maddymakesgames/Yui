module.exports.run = async (client, message, args) => {

hexcode = args[0]

let role = message.guild.roles.find("name", message.author.username);
if(role == null){
  let role =  message.guild.createRole({
    name:message.author.username,
  })

  message.member.addRole(role.id)
  role.setColor(hexcode)
}
else if(message.member.roles.has(role.id)){
  role.setColor(hexcode)
}
else {
  message.member.addRole(role.id)
  role.setColor(hexcode)
}
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["c", "colour"],
  permLevel: "User"
};

exports.help = {
  name: "Color",
  category: "Fun",
  description: "Change your name color.",
  usage: "color <hexidecimal value of a color>"
};
