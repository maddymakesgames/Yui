// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

// Load up the discord.js library
const Discord = require("discord.js");
// We also load the rest of the things we need in this file:
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config file that contains our token and our prefix values.
client.config = require("./config.js");
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();

// Now we integrate the use of Evie's awesome Enhanced Map module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmdFiles = await readdir("./commands/");
  client.log("log", `Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  client.log("log", `Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  // Generate a cache of client permissions for pretty perms
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  client.login(client.config.token);

// End top-level async/await function.
};

init();


/*fs.readdir("./events/", (err, files) => {
  if(err) return console.error(err);
  files.forEach(file => {
      let eventFunction = requite(`./events/${file}`);
      let eventName = vile.split(".")[0];

      client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});



/*


client.login(config.token);
client.on("ready", () => {
  console.log("I am ready!");
});


client.on("message", message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try{
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch(err){
    console.error(err);
  }

//  console.log("Message by " + message.author + " has  been detected with thr content: " + message.content)

//setup roles

  let Moderators = message.guild.roles.find("name", "Modmins");

// Points System
//get points data for each user
let points = JSON.parse(fs.readFileSync("./json files/points.json", "utf8"));
//let points2 = JSON.parse(fs.readFileSync('./json files/points.json', "utf8"));
if(!points[message.author.id]) points[message.author.id] = {
	points: 10,
	level: 0,
  timer: 0
};
random13 = Math.floor(Math.random() * 4);
random130 = Math.floor(Math.random() * 31);

let userData = points[message.author.id];
let userPoints = points[message.author.id] ? points[message.author.id].points : 0;

  if(random13 == 3){
 userData.points += random130;
}

  let curLevel = Math.floor(0.1 * Math.sqrt(userPoints));



  if (userData.level < curLevel) {
    // Level up!
    userData.level = curLevel;
    userData.points = 0;
    message.reply('You have leveled up to level **'+ userData.level + '**!');

  }

  if (message.content.startsWith(config.prefix + "level")) {
    message.reply("You are currently level "+ userData.level +", with"+ userData.points +   " points.");
  }
/*  if(message.content.startsWith(config.prefix + "top"){
    message.reply(/)
}

fs.writeFile("./json files/points.json", JSON.stringify(points), (err) => { if(err) console.error(err)});


console.log(config.prefix)
//command handler
if (!message.content.startsWith(config.prefix)) return; // This returns if the prefix of the command is not the one set.

console.log("A command has been sent")

var debug = config.debug;
var cont = message.content.slice(config.prefix.length).split(" "); // This slices off the prefix, then puts it in an array.
var args = cont.slice(1); // This is everything after the command in an array.


var cmd = client.commands.get(cont[0]) // This tries to grab the command that you called in chat.
if (cmd){
  console.log(cmd + "command has been detected")
 cmd.run(client, message, args); // This checks if it exists, and if it does it runs the command.
 }

if(config.debug == 1){
  message.channel.send("args = " + args);
};

if(message.author.id == config.Owner && cont[0] == "prefix" && config.prefix != "/"){
  cmd = client.commands.get("prefix")
  if (cmd){
     console.log(cmd + "  Using the emergency prefix command!");
     cmd.run(client, message, args);}
}

var respondObject = {
  "blabber": {
      "ying": "yang",
      "themeaningoflife": "42",
      "moo": "I am cow. Hear me moo. I weigh twice as much as you. I look good on the brabicue. Milk, cheese, curds, and others. Come from fluids from my udders. I am cow. I am cow. I am cow.",
"infinity": "♾"
  }
}

//test for the call and responce commands
        var objjj = respondObject["blabber"];
        for (var prop in objjj) {
		//test is the message matches any of the response commands
             if (message.content.startsWith(config.prefix + prop)) {
				 //output response
               message.channel.send(objjj[prop]);
             }
        }

});


// This is called as, for instance:
client.on("guildMemberAdd", member => {
  // Load the guild's settings
  const settings = client.settings.get(member.guild.id);
  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;
  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);
  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find("name", settings.welcomeChannel).send(welcomeMessage).catch(console.error);

  member.guild.createRole({name: member.username});
});

client.on("guildMemberRemove", (member) => {
  const channel = getDefaultChannel(member.guild);
  getDefaultChannel(member.guild).send(`${member} has left our server. :'(`);
});
*/
