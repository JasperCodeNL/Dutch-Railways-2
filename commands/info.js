const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
var Footer = "© Dutch Railways 2022"

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Dutch Railways")
        .setDescription("The oficial discord server \n of Dutch Railways!")
        .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrB-7k3LDbZQzGH_JwqvTOcNctWgfPh7Jv6epugOwdscWs2IJa")
        .setColor("BLUE")
        .addFields(
            {name: "Server name:", value: `${message.guild.name}`},
            {name: "Server owners:", value: "Jasper_K, Matthijs_B"},
            {name: "Members:", value: `${message.guild.memberCount.toString()}`},
        )
        .setFooter("© Dutch Railways Roblox 2022");
        
    return message.channel.send({embeds: [botEmbed] });

}

module.exports.help = {
    name: "info",
    category: "Information",
    description: "Information about our server"
}