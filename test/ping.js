const discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    const msg = await message.channel.send("Pinging...");
    const Embed = new discord.MessageEmbed()
        .setTitle("Pong!")
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setDescription(`⌛ Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\n⏲️ API Ping is ${Math.round(client.ws.ping)}`)
        .setColor('#fb644c');
    msg.edit(Embed);
    msg.edit("\u200b");
}

module.exports.help = {
    name: "ping"
}