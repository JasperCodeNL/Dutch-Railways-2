const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    console.log("It works!")
    var botEmbed = new discord.MessageEmbed()
        .setTitle("It works!")
        .setColor("GREEN")
    
    return message.channel.send({embeds: [botEmbed] });

}

module.exports.help = {
    name: "test",
    category: "Default",
    description: "Does the bot work?"
}

