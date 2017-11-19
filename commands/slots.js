exports.run = async (client, message, args) => {
//const config = require('../json files/config.json')
const fs = require('fs')

//if(message.author.id == config.Owner){
var randint17f = Math.floor(Math.random() * 7)
var randint17s = Math.floor(Math.random() * 7)
var randint17t = Math.floor(Math.random() * 7)
let points = fs.readFileSync("./json files/points.json", "utf8");
let userData = points[message.author.id];

//if(!points[message.author.id]){
//console.log(message.author.id + "has no points")
/// return;
//}
if(randint17f == randint17s && randint17f == randint17t && randint17s == randint17t && randint17f != 3){
const msg = await message.channel.send("You Win!!!")

if(randint17f == 7){
points[message.author.id] += 100;
msg.edit("You Win 100 points!!")
}
else if(randint17f == 4){
points[message.author.id] += 50;
msg.edit("You Win 50 points!!")
}
else {
points[message.author.id] += 30;
msg.edit("You Win 30 points!!")
}
}
else{
message.channel.send("You lost :(")
points[message.author.id] -= 1;
}
fs.writeFile("./json files/points.json", JSON.stringify(points), (err) => { if(err) console.error(err)});
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "Slots",
  category: "Fun",
  description: "Emulates a slot machine and gives you points based on if you win.",
  usage: "slots"
};
