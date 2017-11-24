exports.run = async (client, message, args) => {
var credits = client.credits.get(message.author.id);
var points = client.points.get(message.author.id);
if(args.length >= 3){
    var amount = args[2];
}else{
    var amount = 0;
}
if(args[0] == "set"){
    if(args[1] == "credits"){
        credits = {credits:parseInt(amount)};
        console.log(client.credits);
        client.credits.set(message.author.id, credits);
        message.channel.send(`You now have ${args[0]} credits. Want proof? Here: ${credits.credits}`);
    }
    else if(args[1] == "points"){
        points.points = args[2] || 0;
        client.points.set(message.author.id, points);
        message.channel.send(`You now have ${args[2]} points. Want proof? Here: ${points.points}`);
    }
    else if(args[1] == "level"){
        points.level = args[2] || 0;
        points.points = 0;
        client.points.set(message.author.id, points);
        message.channel.send(`You now are level ${args[2]}. Want proof? Here: ${points.level}`);
    }
    else{
        mesage.channel.send("Please imput a valid setting to set.");
    }
}
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Contributors"
  };
  
  exports.help = {
    name: "cheat",
    category: "Debug",
    description: "Gives an amount or sets one of your user variables.",
    usage: "cheat <set or give> <variable> <amount>"
  };