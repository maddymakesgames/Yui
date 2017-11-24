
exports.run = async (client, message, args) => {
  const author = message.author.id;
  const credits = client.credits.get(author);
  var amount = args[0];
  var money = credits.credits;
  if(args.length > 0){
    amount = args[0]
  }
  else{
    amount = 1;
  }
  //console.log("amount = "+amount);
 // console.log(credits.credits < amount);
  if(money < amount){
     message.channel.send(`You don't have ${amount} credits`); return;
    }
     else{
       money -= amount;
       console.log (`${money}   ${amount}`);
  var jackpot = amount * 25;
  var triple7s = amount * 15;
  var double7s = amount * 9;
  var single7 = amount * 3;
  var secondPrize = amount * 4;
  var lastPrize = amount * 3;
  //console.log(`jackpot = ${jackpot} \n firstprize = ${firstPrize} \n second Prize = ${secondPrize} \n last Prize = ${lastPrize}`);

  const slotsObj = {
    "slots":{
      0:":flag_lv:",
      1:":melon:",
      2:":apple:",
      3:":watermelon:",
      4:":tangerine:",
      5:":bell:",
      6:":cherries:",
      7:":gem:"
    }
  }
  //console.log(JSON.stringify(slotsObj));
 // console.log(slotsObj["slots"])
  const msg = await message.channel.send(`**Slot [:slot_machine:] Machine**\n`);
 // console.log(`message sent = ${msg}`);
  var n = new Array();
  var l = new Array();
  var weight = [0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7];
  var output = "";
  const slotsProps = slotsObj["slots"];
  for(var i = 0; i < 5; i++){
    for(var e = 0; e < 9; e++){
      n[e] = await weight.random();
      for(var prop in slotsProps){
        if(n[e] == prop) l[e] = slotsProps[prop];
      }
      if((e+1)%3 == 0){
       // console.log((e+1)%3 + " " + l[e] + " " + e);
        output += l[e];
        output += `\n`;
      }
      else{
        output += l[e];
        output += `|`;
      }
      
    } 
    await msg.edit(`**Slot [:slot_machine:] Machine**\n ${output}`);
    output = "";
   // console.log(`message editted`)
  }
  if(l[3] == l[4] && l[3] == l[5]){
    const msg = await message.channel.send("You Win!!!")

    if(n[3] == 7){
      money += jackpot;
      msg.edit(`**${message.author.username}**, You Win ${jackpot} credits!!`);
    }
    else if(n[3] == 6){
      money += triple7s;
      msg.edit(`**${message.author.username}**, You win ${triple7s} credits!!`)
    }
    else if(n[3] == 4){
     money += firstPrize;
      msg.edit(`**${message.author.username}**, You Win ${firstPrize} credits!!`);
    }
    else if(n[3] != 0) {
      money += secondPrize;
      msg.edit(`**${message.author.username}**, You Win ${secondPrize} credits!!`);
    }
  }
  else if(l[3] == l[4] && n[4] == 6 || l[4] == l[5] && n[4] == 6){
    const msg = await message.channel.send("You Win!!!");
      money += double7s;
      msg.edit(`**${message.author.username}**, You Win ${double7s} credits!!`);
  }
  else if(n[3] == 6 || n[4] == 6 || n[5] == 6){
    money += single7;
    message.channel.send(`**${message.author.username}**, You Win ${single7} credits!!`);

  }
  else{
    message.channel.send(`**${message.author.username}** You lost :(`);
    //   points[message.author.id] -= 1;
  }
  console.log(`3: ${l[3]}, 4: ${l[4]}, 5: ${l[5]}`);
  console.log(`3: ${n[3]}, 4: ${n[4]}, 5: ${n[5]}`);
  credits.credits = money;
  console.log(credits.credits);
  client.credits.set(author, credits);
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
