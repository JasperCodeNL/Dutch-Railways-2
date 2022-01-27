const { Client, Intents, Collection, GuildMember } = require("discord.js");
const botConfig = require("./config.json");
const discord = require("discord.js");
const fs = require("fs");
const { channel } = require("diagnostics_channel");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log(`${command.help.name}.js is loaded!`)

}

client.once("ready", () => {

    console.log(`${client.user.username} is Online!`);
    client.user.setActivity("Dutch Railways", { type: "PLAYING" });

});


client.on("messageCreate", async message => {

    if (message.author.bot) return;

    //var prefix = botConfig.prefix;
    var prefix = process.env.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    const commandData = client.commands.get(command.slice(prefix.length));

    if (!commandData) return;

    var arguments = messageArray.slice(1);

    try {

        await commandData.run(client, message, arguments);

    } catch (error) {
        console.error();
        await message.reply(`${error}`);
    }

});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get("809064498014322729");

    member.role.add(role);

    var logChannel = member.guild.channels.cache.get("935864875182346290");

    var joinEmbed = new discord.MessageEmbed()
        .setTitle("User joined")
        .setDescription("An user joined the Discord server.")
        .setColor("GREEN")
        .setFooter("Discord-logs")
        .addFields(
            { name: "Name:", value: `*${member}*` },
            { name: "Id:", value: `*${member.id}*` },
            { name: "Account Age:", value: `*${member.user.createdAt}*` },
        );

    logChannel.send({ embeds: [joinEmbed] });

});

client.on("guildMemberRemove", member => {

    var logChannel = member.guild.channels.cache.get("935864875182346290");

    var leaveEmbed = new discord.MessageEmbed()
        .setTitle("User leaved")
        .setDescription("An user leaved the Discord server.")
        .setColor("RED")
        .setFooter("Discord-logs")
        .addFields(
            { name: "Name:", value: `*${member}*` },
            { name: "Id:", value: `*${member.id}*` },
            { name: "Account Age:", value: `*${member.user.createdAt}*` },
        );

    logChannel.send({ embeds: [leaveEmbed] });

});

client.on("messageDelete", async messageDeleted => {

    if (messageDeleted.author.bot) return;

    var deleteEmbed = new discord.MessageEmbed()
        .setTitle("Message deleted")
        .setDescription("A message is deleted.")
        .setColor("BLUE")
        .setFooter("Discord-logs")
        .addFields(
            { name: "User:", value: `${messageDeleted.author.tag} (${messageDeleted.author.id})` },
            { name: "Channel:", value: `${messageDeleted.channel}` },
            { name: "Message:", value: `${messageDeleted.content}` },
        );

    client.channels.cache.get('935864875182346290').send({ embeds: [deleteEmbed] });

});

client.on("messageUpdate", async (oldMessage, newMessage) => {

    if (newMessage.author.bot) return;

    if (oldMessage.content == newMessage.content) return;

    var editEmbed = new discord.MessageEmbed()
        .setTitle("Message deleted")
        .setDescription("A message is deleted.")
        .setColor("BLUE")
        .setFooter("Discord-logs")
        .addFields(
            { name: "User:", value: `${newMessage.author.tag} (${newMessage.author.id})` },
            { name: "Channel:", value: `${newMessage.channel}` },
            { name: "Befor:", value: `${oldMessage.content}` },
            { name: "After:", value: `${newMessage.content}` },
        );

    client.channels.cache.get('935864875182346290').send({ embeds: [editEmbed] });

});

client.login(process.env.token);
//client.login(botConfig.token);

