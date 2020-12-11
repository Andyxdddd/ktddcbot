const discord = require("discord.js");
module.exports.run = async (client, message, args) => {

    let region;
    switch (message.guild.region) {
        case "europe":
            region = '🇪🇺 Europe';
            break;
        case "us-east":
            region = '🇺🇸 us-east'
            break;
        case "us-west":
            region = '🇺🇸 us-west';
            break;
        case "us-south":
            region = '🇺🇸 us-south'
            break;
        case "us-central":
            region = '🇺🇸 us-central'
            break;
    }

    const { guild } = message
    const { name, id, premiumTier } = guild

    var ServerInfoEmbed = new discord.MessageEmbed()
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setColor(`#6991ff`)
        .setFooter(`Server Name: ${name} | ServerID: ${id}`)
        .addFields(
            {
                name: "Server Owner ᲼᲼᲼᲼",
                value: message.guild.owner.user.tag,
                inline: true
            },
            {
                name: "Members Count ᲼᲼᲼",
                value: `${message.guild.memberCount} members`,
                inline: true
            },
            {
                name: "Server Created ᲼᲼",
                value: message.guild.createdAt.toLocaleDateString("en-us"),
                inline: true
            },
            {
                name: "Roles Count ",
                value: `${message.guild.roles.cache.size}`,
                inline: true,
            },
            {
                name: `Region `,
                value: region,
                inline: true
            },
            {
                name: 'Server Boost',
                value: message.guild.premiumSubscriptionCount >= 1 ? `Level ${premiumTier}, Boosts ${message.guild.premiumSubscriptionCount}` : `There are no boosts`,
                inline: true
            },
        )
    return message.channel.send(ServerInfoEmbed);

}

module.exports.help = {
    name: "server-info"
}