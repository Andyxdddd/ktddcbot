const discord = require("discord.js");
const axios = require('axios');
module.exports.run = async (client, message, args) => {
    const url = "https://some-random-api.ml/img/pikachu";
    let image, response;

    try {
        response = await axios.get(url);
        image = response.data;
    } catch (e) {
        return message.channel.send(`An error occured, please try again!`)
    }

    const embed = new discord.MessageEmbed()
        .setTitle(`Random Pikachu Image`)
        .setColor(`#6991ff`)
        .setImage(image.link)
    await message.channel.send(embed)
}

module.exports.help = {
    name: "pikachu"
}