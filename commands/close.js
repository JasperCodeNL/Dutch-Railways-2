const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Hello!")
        .setColor("BLUE")

    return message.channel.send({embeds: [botEmbed] });
}

module.exports.help = {
    name: "close",
    category: "Moderation",
    description: "Close a ticket."
}