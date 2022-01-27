const { Client, Intents, Collection, GuildMember } = require("discord.js");
const botConfig = require("./config.json");
const fs = require("fs");
const { channel } = require("diagnostics_channel");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS]
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

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get("809064498014322729");

    if (!role) return;

    member.role.add(role);

    var logChannel = member.guild.channels.cache.get("935864875182346290");

    if(!logChannel) return;

    logChannel.send(`**${member}** Joinded the server!`)

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

client.login(process.env.token);
//client.login(botConfig.token);

