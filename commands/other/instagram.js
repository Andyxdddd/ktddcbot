const discord = require("discord.js");
const axios = require('axios')
module.exports.run = async (client, message, args) => {

    if (!args[0]) {
        return message.channel.send(`Please Enter a Channel Name`)
    }
    let url, response, account, details;
    try {
        url = `https://instagram.com/${args[0]}/?__a=1`;
        response = await axios.get(url)
        account = response.data
        details = account.graphql.user
    } catch (error) {
        return message.channel.send(`Not A Account`)
    }

    const embed = new discord.MessageEmbed()
        .setThumbnail(details.profile_pic_url)
        .setColor(`#6991ff`)
        .addFields(
            {
                name: `${details.is_verified ? `${details.username} <a:verifiedpink:786594812350562364>` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `,
                value: `${details.biography ? `${details.biography}` : `No biography`} `,
                inline: false
            },
            {
                name: "Total Posts:",
                value: details.edge_owner_to_timeline_media.count.toLocaleString(),
                inline: true
            },
            {
                name: "Followers:",
                value: details.edge_followed_by.count.toLocaleString(),
                inline: true
            },
            {
                name: "Following:",
                value: details.edge_follow.count.toLocaleString(),
                inline: true
            }
        )
    await message.channel.send(embed)
}

module.exports.help = {
    name: "instagram"
}