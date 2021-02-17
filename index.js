const botconfig = require("./botconfig.json");
const Discord = require("discord.js")
const prefix = "!"

const client = new Discord.Client({disableEveryone: true})

client.on("ready", async () => {
    console.log(`${client.user.tag} jest online`)
});

client.on("message", async message => {
    if (message.author.bot) return;

    if (message.content.indexOf(prefix) !== 0) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase()
    switch (command) {
        case 'say': {
            message.delete()
            if (message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(message.content.slice(prefix.length + 3))
            else return message.channel.send("Nie posiadasz permisji!")
            break;
        }
        case 'embed': {
            let embed = new Discord.RichEmbed()
                .setDescription("Poradnik Embedy Discord.js")
                .setTitle("Embed info")
                .setColor(`#ff0000`)
                .setThumbnail(client.user.avatarURL)

            message.channel.send(embed)
            break;
        }
        case 'infoserwer':
        case 'serverinfo': {
            let embed = new Discord.RichEmbed()
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
            break;
        }
        case 'propozycja': {
            let wiadomsc = message.content.slice([prefix.length + 10])
            let embed = new Discord.RichEmbed()
                .setAuthor(message.member.user.username, message.member.user.avatarURL)
                .addField("Treść propozycji", wiadomsc, false)
                .setFooter("Jeśli się zgadzasz kliknij emotkę ✔️ | Jeśli się nie zgadzasz klikniej emotkę ❌")

            let kanal = client.channels.get("657815752606220288")
            kanal.send(embed).then(async embedMessage => {
                await embedMessage.react('657810542043463680')
                await embedMessage.react('657810551610540044')
                return
            })
            break;
        }
        case 'moneta':
        case 'rzutmonetą': {
            let wynik = (Math.floor(Math.random() * 2) == 0) ? 'Orzeł' : "Reszka"
            let embed = new Discord.RichEmbed()
                .setTitle("Wynik losowania:")
                .setDescription(wynik)
                .setColor("GREEN")
            return message.channel.send(embed)
        }
    }
});

client.login(botconfig.token)
