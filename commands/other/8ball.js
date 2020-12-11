const discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (!args[2]) return message.reply("Please ask a full question");
    let replies = ["Yes.", "No.", "As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Most likely.", "My reply is no.", " My sources say no.", "Signs point to yes.", "Yes – definitely."]
    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");
    let answer = replies[result];
    return message.channel.send(`${user.user} asked: ${question}?\nAnswer: ${answer}`)
}

module.exports.help = {
    name: "8ball"
}