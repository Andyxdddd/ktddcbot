const discord = require("discord.js");
module.exports.run = async (client, message, args) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const embed = new discord.MessageEmbed()
        .setColor(`#6991ff`)
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            {
                name: "Name ",
                value: `${user.user.username}#${user.user.discriminator}`,
                inline: true
            },
            {
                name: "ID ",
                value: user.user.id,
                inline: true
            },
            {
                name: 'Avatar link ',
                value: `[Click Here](${user.user.displayAvatarURL()})`,
                inline: true
            },
            {
                name: 'User Roles ',
                value: user.roles.cache.map(role => role.toString()).join(" \n"),
                inline: true
            },
            {
                name: 'Creation Date ',
                value: user.user.createdAt.toLocaleDateString("en-us"),
                inline: true
            },
            {
                name: 'Joined Date ',
                value: user.joinedAt.toLocaleDateString("en-us"),
                inline: true
            }
        )

    await message.channel.send(embed)

}

module.exports.help = {
    name: "user-info"
}