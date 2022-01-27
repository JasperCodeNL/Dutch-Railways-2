const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "855749102171193345";

    if (!message.member.roles.cache.has('821727410521243650')) return;

    if (message.channel.parentId == categoryID) {


        var LogEmbed = new discord.MessageEmbed()
            .setTitle("Ticket Closed")
            .setFooter("Discord-logs")
            .setTimestamp()
            .setColor("BLUE")
            .addFields(
                { name: "Closed by:", value: `${message.author.tag} (${message.author.id})` },
                { name: "Ticket:", value: `#${message.channel.name}` }
            );


        client.channels.cache.get('935864875182346290').send({ embeds: [LogEmbed] });

        message.channel.delete();

    }

}

module.exports.help = {
    name: "close",
    category: "Moderation",
    description: "Close a ticket."
}