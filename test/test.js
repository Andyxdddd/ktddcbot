const discord = require("discord.js");
const Canvas = require('canvas');
module.exports.run = async (client, message, args) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/banner.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

    // Add an exclamation point here and below
    ctx.font = '40px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${user.user.username}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(user.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    message.channel.send(`Welcome to the server, ${user.user.username}!`, attachment);
}

module.exports.help = {
    name: "test"
}