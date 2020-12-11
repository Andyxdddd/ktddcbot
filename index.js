const discord = require("discord.js");
const fs = require("fs");
const botConfig = require("./botconfig.json");

const client = new discord.Client();
client.commands = new discord.Collection();

fs.readdir("./commands/moderation/", (err, files) => {
    if (err) console.log(err);
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) {
        console.log("Commands not found!");
        return;
    }
    jsFiles.forEach((f, i) => {
        var fileGet = require(`./commands/moderation/${f}`);
        client.commands.set(fileGet.help.name, fileGet);
    });
});

fs.readdir("./commands/other/", (err, files) => {
    if (err) console.log(err);
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) {
        console.log("Commands not found!");
        return;
    }
    jsFiles.forEach((f, i) => {
        var fileGet = require(`./commands/other/${f}`);
        client.commands.set(fileGet.help.name, fileGet);
    });
});

client.on("ready", async () => {
    console.log(`${client.user.username} is online.`);
    client.user.setActivity("Kids These Days!", { type: "LISTENING" });
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    var msg = message.content.toLowerCase();
    for (let i = 0; i < (botConfig.badWords).length; i++) {
        if (msg.includes((botConfig.badWords)[i])) {
            message.delete();
            return message.reply("No Sware Words").then(msg => msg.delete({ timeout: 3000 }))
        }
    }

    const links = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
    if (!message.member.roles.cache.some(role => (botConfig.allowUrl).includes(role.name))) {
        if (links.exec(message.content)) {
            message.delete();
            await message.channel.send(`You are not allowed to send links`).then(msg => msg.delete({ timeout: 3000 }));
        }
    }

    try {
        var prefix = botConfig.prefix;
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        var messageArrey = message.content.split(" ");
        var command = messageArrey[0];
        var arguments = messageArrey.slice(1);
        var commands = client.commands.get(command.slice(prefix.length));
        if (command) commands.run(client, message, arguments);
    } catch (err) { }
});

client.login(process.env.token);