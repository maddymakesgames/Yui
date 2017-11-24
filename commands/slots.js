exports.run = async (client, message, args) => {
  
  const money = client.credits.get(message.author.id);
  const amount = args[0];
  if(args[0].length < 0){
    amount = args[0]
  }
  else{
    amount = 1;
  }
  if(!(money.credits >= amount)) message.chanel.send(`You don't have ${amount} credits`); return;
  var jackpot = amount * 5;
  var firstPrize = amount * 2;
  var secondPrize = amount * 1.5;
  var lastPrize = amount * 1.1;

  const slotsObj = {
    "slots":{
      0:":flag_lv:",
      2:":apple:",
      3:":watermelon:",
      4:":tangerine:",
      5:":bell:",
      6:":cherries:",
      7:":gem:"
    }
  }
  const msg = await message.channel.send(`**Slot [:slot_machine:] Machine**\n`);
  for(var i = 0; i < 5; i++){
    for(var e = 0; e < 9; e++){
      n[e] = Math.floor(Math.random() * 7);
      for(var prop in slotsObj["slots"]){
        if(n[e] == prop) e[e] = prop;
      }
      if(e % 3 == 0)e[e] += '\n';
      output += e[e];
    }
    msg.edit(`**Slot [:slot_machine:] Machine**\n` + output);
  }

  if(randint17f == randint17s && randint17f == randint17t && randint17s == randint17t && randint17f != 3){
    const msg = await message.channel.send("You Win!!!")

    if(randint17f == 7){
      credits.credits += jackpot;
      message.channel.send(`<first line here> \n :gem::gem::gem: \n <thirdlinehere>`)
      msg.edit(`You Win ${jackpot} points!!`);
    }
    else if(randint17f == 4){
     credits.credits += firstPrize;
      msg.edit(`You Win ${firstPrize} points!!`);
    }
    else if(randint17f != 0) {
      credits.credits += secondPrize;
      msg.edit(`You Win ${secondPrize} points!!`);
    }
    else{
      message.channel.send(`You got all Xs! You lose. `);
    }
  }
  else{
    message.channel.send("You lost :(")
     points[message.author.id] -= 1;
  }
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "slots",
  category: "Fun",
  description: "Use an amount of credits to give a chance to win a large amount of credits.",
  usage: "slots <a amount of credits. Leave blank to use one>"
};
