const discord = require("discord.js");
const axios = require('axios');
module.exports.run = async (client, message, args) => {
    try {
        const url = 'https://some-random-api.ml/animu/wink';

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error occured!`).then(msg => msg.delete({ timeout: 3000 }))
        }

        if (!args[0]) {
            return message.channel.send("Please specify the member to hug `e.g. !wink @Jisoo`").then(msg => msg.delete({ timeout: 3000 }))
        }

        const embed = new discord.MessageEmbed()
            .setDescription(`${message.author} winks at ${message.mentions.users.first() || message.mentions.members.first()}`)
            .setColor(`#6991ff`)
            .setImage(data.link)

        await message.channel.send(embed)
    } catch (e) {
        return message.channel.send("Please specify the member to hug `e.g. !wink @Jisoo`").then(msg => msg.delete({ timeout: 3000 }))
    }
}

module.exports.help = {
    name: "wink"
}