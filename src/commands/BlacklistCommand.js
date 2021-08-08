const { SchemaBlacklist } = require("../Schema");
const Command = require("../Command");

class Blacklist extends Command {
    constructor(client) {
        super(client, {
            name: "blacklist"
        });
    };
    
    /**
     * 
     * @param {Message} message 
     */
    async execute(message, argument) {

        if (message.author.id !== this.client.config.riode.id) {
            return;
        };

        if (!argument[0]) {
            return;
        };
        
        if (argument == this.client.config.riode.id) {
            return;
        };

        let getUser = this.client.users.cache.get(argument[0]);
        if (getUser) {

            const user = await SchemaBlacklist.findOne({ User: getUser.id});
            if (user) {
                message.channel.send("✅ The user is no longer on blacklist");
                warn(getUser, 2);
                log(this.client, getUser, 2);

                return user.delete();
            } else {
                const addToBlacklist = new SchemaBlacklist({ User: getUser.id, Time: Date.now()});
                message.channel.send("✅ The user is now on blacklist");
                warn(getUser, 1);
                log(this.client, getUser, 1);

                return addToBlacklist.save();
            };

        } else {
            return message.channel.send(":x: Couldn't find out that user.");
        };
    };
};

/*
Function to send the info to the user.
*/
function warn(user, type) {

    if (type == 1) {
        user.send({
            embeds: [
                {
                    title: "Blacklist",
                    description: "We have blacklisted you from using \"Honk am Goose\".\nYou might have `spam` the commands!\n\nIf you think it was a mistake or want us to revoke it. Join the server:\nhttps://discord.gg/ZPcUTdDwWd",
                    color: "#d2e4ff"
                }
            ]
        }).catch(() => {
            return;
        });
    };

    if (type == 2) {
        user.send({
            embeds: [
                {
                    title: "Pardoned",
                    description: "We removed you from our blacklist.\nNow, you can use \"Honk am Goose\" again.",
                    color: "#d2e4ff"
                }
            ]
        }).catch(() => {
            return;
        });
    };
};

/*
Function to log the action on the private channel on Discord.
*/
function log(client, user, type) {

    const channel = client.channels.cache.get(client.config["channel-log"]);
    if (channel) {

        try {

            if (type == 1) {
                channel.send({
                    content: `\`[ Type: Blacklist ]\` ${user.tag} (${user.id}) | ${require("moment")(Date.now()).format("LLLL")}`
                });
            };

            if (type == 2) {
                channel.send({
                    content: `\`[ Type: Pardon ]\` ${user.tag} (${user.id}) | ${require("moment")(Date.now()).format("LLLL")}`
                })
            };
        } catch (error) {
            return;
        };
    };
};

/*
This function will help to remove a
specific element from an array.
*/
function removeFromArray(arr) {
    var what, a = arguments, L = a.length, ax;

    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        };
    };

    return arr;
};

module.exports = Blacklist;
