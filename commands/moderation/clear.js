const discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    try {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(`You do not have correct permissions to do this action, ${message.author.username}`).then(msg => msg.delete({ timeout: 3000 }));
        if (!args[0]) {
            return message.channel.send("Please specify the number of messages to clear `!clear 10`").then(msg => msg.delete({ timeout: 3000 }))
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]) + 1;
        }

        var deleteAmountCount = deleteAmount - 1;
        await message.channel.bulkDelete(deleteAmount, true);

        if (args[0] == 1) {
            return message.channel.send(`I have deleted 1 message!`).then(msg => msg.delete({ timeout: 3000 }))
        } else {
            return message.channel.send(`I have deleted ${deleteAmountCount} messages!`).then(msg => msg.delete({ timeout: 3000 }));
        }
    } catch (e) {
        return message.channel.send(`Maximum 99 mesages!`).then(msg => msg.delete({ timeout: 3000 }));
    }
}

module.exports.help = {
    name: "clear"
}