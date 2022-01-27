const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var ClearEmbed = new discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("Clear Command")
        .setDescription("Delete messages. \n Command: *?clear <amount>*");




    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    if (!args[0]) return message.channel.send({ embeds: [ClearEmbed] });

    if (parseInt(args[0])) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (parseInt(args[0]) == 1) {

                var ClearedEmbed = new discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(`1 Message deleted!`)

                message.channel.send({ embeds: [ClearedEmbed] }).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 3000);
                });

            } else {

                var ClearedEmbedB = new discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(`${parseInt(args[0])} Messages deleted!`)

                message.channel.send({ embeds: [ClearedEmbedB] }).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 3000);
                });
            }

        }).catch(err => {
            return message.channel.send({ embeds: [ClearEmbed] });
        });

    } else {
        return message.channel.send({ embeds: [ClearEmbed] });
    }

}

module.exports.help = {
    name: "clear",
    category: "Moderation",
    description: "Delete messages"
}