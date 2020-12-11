const discord = require("discord.js");
const axios = require('axios');
module.exports.run = async (client, message, args) => {
    try {
        const url = 'https://some-random-api.ml/meme';

        let data, response;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error has occured, try again!`).then(msg => msg.delete({ timeout: 3000 }))
        }

        const embed = new discord.MessageEmbed()
            .setTitle(`Random Meme: `)
            .setDescription(data.caption)
            .setColor(`#6991ff`)
            .setImage(data.image)

        await message.channel.send(embed)
    } catch (e) {
        return message.channel.send("An error occured!").then(msg => msg.delete({ timeout: 3000 }))
    }
}

module.exports.help = {
    name: "meme"
}