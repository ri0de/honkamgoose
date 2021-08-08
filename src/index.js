const { token } = require("./data/config.json");
const { Client, Collection } = require("discord.js");
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ],
    allowedMentions: {
        parse: ["everyone"]
    }
});

client.config = require("./data/config.json");
const commands = new Collection();

client.once("ready", () => {

    console.log(
        `[ Type: Ready ] ${client.user.username} (${client.user.id}) | Guilds: ${client.guilds.cache.size}`
    );

    client.user.setActivity("Honk | " + client.config.prefix + "help");
});

client.on("messageCreate", async (message) => {

    if (message.content.startsWith(client.config.prefix) !== true) {
        return;
    };

    const argument = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);

    const commandName = argument.shift().toLowerCase();
    const command = commands.get(commandName);

    if (command !== undefined) {
        command.execute(message, argument);
    };
});

client.on("guildCreate", async (guild) => {

    const channel = client.channels.cache.get(client.config["channel-log"]);
    if (channel) {
        client.users.fetch(String(guild.ownerId)).then(user => {
            channel.send({
                content: `\`[ Type: guildCreate ]\` ${guild.name} (${guild.id}) | Owner: ${user.tag} (${user.id}) | Members: ${guild.memberCount}`
            });
        });
    };
});

client.on("guildDelete", async (guild) => {

    const channel = client.channels.cache.get(client.config["channel-log"]);
    if (channel) {
        client.users.fetch(String(guild.ownerId)).then(user => {
            channel.send({
                content: `\`[ Type: guildDelete ]\` ${guild.name} (${guild.id}) | Owner: ${user.tag} (${user.id}) | Members: ${guild.memberCount}`
            });
        });
    };
});

/*
Sets it as global[commands]
*/
global.commands = commands;

/*
Executes the handler file
*/
require("./Handler")(client, commands);
client.login(process.env.token || token);