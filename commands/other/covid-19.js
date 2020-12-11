const discord = require("discord.js");
const axios = require('axios');
module.exports.run = async (client, message, args) => {
    const baseUrl = "https://corona.lmao.ninja/v2";

    let url, response, corona;

    try {
        url = args[0] ? `${baseUrl}/countries/${args[0]}` : `${baseUrl}/all`
        response = await axios.get(url)
        corona = response.data
    } catch (error) {
        return message.channel.send(`***${args[0]}*** doesn't exist, or data isn't being collected`)
    }

    const embed = new discord.MessageEmbed()
        .setTitle(args[0] ? `${args[0].toUpperCase()} Stats` : 'Total Corona Cases World Wide')
        .setColor(`#6991ff`)
        .setThumbnail(args[0] ? corona.countryInfo.flag : 'https://i.imgur.com/MupfsSR.png')
        .setImage('https://i.imgur.com/wRmtKE0.png')
        .addFields(
            {
                name: 'Total Cases: ᲼᲼᲼᲼',
                value: corona.cases.toLocaleString(),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false
            },
            {
                name: 'Total Deaths: ᲼᲼᲼᲼',
                value: corona.deaths.toLocaleString(),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true
            },
            {
                name: 'Total Recovered: ᲼',
                value: corona.recovered.toLocaleString(),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false
            },
            {
                name: 'Todays Deaths: ᲼᲼᲼᲼',
                value: corona.todayDeaths.toLocaleString(),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true
            },
            {
                name: 'Today Recoveries:᲼᲼',
                value: corona.todayRecovered.toLocaleString().replace("-", ""),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false
            },
            {
                name: 'Critical Cases: ᲼᲼᲼᲼',
                value: corona.critical.toLocaleString(),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true
            },
            {
                name: 'Active Cases:',
                value: corona.active.toLocaleString(),
                inline: true
            })

    await message.channel.send(embed)
}

module.exports.help = {
    name: "covid"
}