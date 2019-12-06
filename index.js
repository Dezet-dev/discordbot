const botconfig = require("./botconfig.json");
const Discord = require("discord.js")
const prefix = "!"
var nazwabota = "mój bot"

const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async () => {
    console.log(`${nazwabota} jest online`)
});

bot.on("message", async message => {
    if (message.author.bot) return;
 
    if (message.content.indexOf(prefix) !== 0) return;
    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();
});

if(command == "say"){
    message.delete()
}

bot.login(botconfig.token)
