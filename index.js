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
    var command = args.shift().toLowerCase()


if(command == "say"){
    message.delete() 
   
 

   if(message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(message.content.slice(prefix.length+3)) 
   else
   return message.channel.send("Nie posiadasz permisji!")  
}

if(command == "embed"){
    var embed = new Discord.RichEmbed()
    .setDescription("Poradnik Embedy Discord.js")
    .setTitle("Embed info")
    .setColor(`#ff0000`)
    .setThumbnail(bot.user.avatarURL)
    
    message.channel.send(embed)

}
if(command == "infoserwer"){
    var embed = new Discord.RichEmbed()
    .addField("Nazwa Serwera:", message.guild.name, true)
    .addField("Właściciel serwera:", message.guild.owner.user.tag, true)
    .addField("Data stworzenia serwera:", message.guild.createdAt, false)
    .addField("Data dołączenia na serwer:", message.guild.joinedAt, false)
    .addField("Role serwera:", message.guild.roles.map(roles => `${roles.name}`).join(`, `), false)
    .setColor("GREEN")
    .setTimestamp()
    .setFooter(message.member.user.tag, message.member.user.avatarURL)
    .setAuthor(message.member.user.username, message.member.user.avatarURL)
    .setThumbnail(message.guild.iconURL)
    .setImage(message.guild.iconURL)


    return message.channel.send(embed)
}
if(command == "propozycja"){
    var wiadomsc = message.content.slice([prefix.length+10])
    var embed = new Discord.RichEmbed()
    .setAuthor(message.member.user.username, message.member.user.avatarURL)
    .addField("Treść propozycji", wiadomsc, false)
    .setFooter("Jeśli się zgadzasz kliknij emotkę ✔️ | Jeśli się nie zgadzasz klikniej emotkę ❌")

    var kanal = bot.channels.get("657815752606220288")
    kanal.send(embed).then(async embedMessage => {
        await embedMessage.react('657810542043463680')
        await embedMessage.react('657810551610540044')
    return
    })
}
if(command == "rzutmonetą"){

    var wynik = (Math.floor(Math.random() * 2) == 0) ? 'Orzeł' : "Reszka"
    var embed = new Discord.RichEmbed()
    .setTitle("Wynik losowania:")
    .setDescription(wynik)
    .setColor("GREEN")
    return message.channel.send(embed)
}
});     

bot.login(botconfig.token)