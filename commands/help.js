const discord = require("discord.js");
const botConfig = require("../config.json")

module.exports.run = async (client, message, args) => {

    try {

        //var prefix = botConfig.prefix;
        var prefix = process.env.prefix;

        var standart = ""
        var Info = ""
        var Mod = "-"

        client.commands.forEach(command => {

            switch (command.help.category) {

                case "Default":
                    standart += `${prefix}${command.help.name} - ${command.help.description}\n`;
                    break;

                case "Information":
                    Info += `${prefix}${command.help.name} - ${command.help.description}\n`;
                    break;

                case "Moderation":
                    Mod += `${prefix}${command.help.name} - ${command.help.description}\n`;
                    break;

            }

        });

        var respons = new discord.MessageEmbed()
            .setTitle("Commands")
            .setColor("BLUE")
            .setFooter("All commands")
            .setTimestamp()
            .addFields(
                { name: "Default:", value: `${standart}` },
                { name: "Information:", value: `${Info}` },
                { name: "Moderation:", value: `${Mod}` },
            )

        message.channel.send({ embeds: [respons] });

    } catch (error) {
        console.log(error);
        message.reply(error);
    }

}

module.exports.help = {
    name: "help",
    category: "Information",
    description: "All commands!"
}