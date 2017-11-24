module.exports.run = async (client, message, args) => {

  function isHex(h) {
  var a = parseInt(h,16);
  return (a.toString(16) ===h.toLowerCase())
  }

var hexcode = "";
if(args[0].charAt(0) != "#" && isHex(args[0]) == true){
hexcode = "#" + args[0];
}else if(args[0].charAt(0) == '#' && isHex(args[0].substring(1))){
  hexcode = args[0]
}else{
  var colors = {
    "color":{
      "red":"#FF0000",
      "blue":"#0404B4",
      "green":"#00FF00",
      "purple":"#5F04B4",
      "pink":"#FE2EF7",
      "yellow":"#FFFF00",
      "orange":"#FE9A2E",
      "cyan":"#00FFFF"
    }
  };
  colorObj =  colors["color"];
  for(var prop in colorObj){
    if(args[0] == prop){
      hexcode = colorObj[prop];
    }
  }
}


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
  name: "color",
  category: "Fun",
  description: "Change your name color.",
  usage: "color <hexidecimal value of a color>"
};
