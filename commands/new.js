const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "855749102171193345";

    var userName = message.author.userName;

    var userDiscriminator = message.author.discriminator;

    var reason = args.join(" ");

    if (!reason) reason = "Niet opgegeven!"

    message.guild.channels.create(`ticket-${userDiscriminator}`, { type: "text" }).then((createdChan) => {

        createdChan.setParent(categoryID).then((settedParent) => {

            settedParent.permissionOverwrites.edit(message.author.id, {
                CREATE_INSTANT_INVITE: false,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                ADD_REACTIONS: true
            });

            let TicketChEmbed = new discord.MessageEmbed()
                .setTitle(`ticket-${userDiscriminator}`)
                .setDescription(`Welcome ${message.author}, the staff team is coming soon. Send your message in advance.`)
                .addField("Reason:", reason)
                .setFooter(`ticket-${userDiscriminator}`)

            let CreateEmbed = new discord.MessageEmbed()
                .setTitle(`Your ticket has been created ${message.author}! | ${createdChannel}`)
                .setTimestamp()

            let LogEmbed = new discord.MessageEmbed()
                .setTitle("Ticket Created")
                .setFooter("Discordlogs")
                .setTimestamp()
                .setColor("BLUE")
                .addFields(
                    { name: "User:", value: `${message.author.tag} (${message.author.id})` },
                    { name: "Ticket:", value: `#${createdChannel.name}` }
                );
            
            message.channel.send({ embeds: [CreateEmbed] });
            settedParent.send({ embeds: [TicketChEmbed] });
            bot.channels.cache.get('935864875182346290').send({ embeds: [LogEmbed] });

        }).catch(err => {
            console.log(err)
            message.channel.send(err)
        });

    }).catch(err => {
        console.log(err)
        message.channel.send(err)
    });

}

module.exports.help = {
    name: "new",
    category: "Default",
    description: "Create a ticket"
}