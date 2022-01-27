const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Members:")
        .setDescription(`${message.guild.memberCount.toString()}`)
        .setColor("BLUE")

    return message.channel.send({embeds: [botEmbed] });
}

module.exports.help = {
    name: "members",
    category: "Information",
    description: "All members"
}