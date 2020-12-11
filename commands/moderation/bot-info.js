const discord = require("discord.js");
const os = require('os')
module.exports.run = async (client, message, args) => {

    const embed = new discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle('Bot Stats')
        .setColor(`#6991ff`)
        .addFields(
            {
                name: 'Servers',
                value: `Serving ${client.guilds.cache.size} servers.`,
                inline: true
            },
            {
                name: 'Channels',
                value: `Serving ${client.channels.cache.size} channels.`,
                inline: true
            },
            {
                name: 'Server Users',
                value: `Serving ${client.users.cache.size}`,
                inline: true
            },
            {
                name: 'Ping',
                value: `${Math.round(client.ws.ping)}ms`,
                inline: true
            },
            {
                name: 'Join Date',
                value: client.user.createdAt.toLocaleDateString("en-us"),
                inline: true
            },
            {
                name: 'Server Info',
                value: `Cores: ${os.cpus().length}`,
                inline: true
            }
        )
        .setFooter(`Created By: ${message.author.tag}`, message.author.displayAvatarURL())

    await message.channel.send(embed)

}

module.exports.help = {
    name: "bot-info"
}