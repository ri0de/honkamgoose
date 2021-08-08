const { Message } = require("discord.js");
const Command = require("../Command");

const path = require("path");
const fs = require("fs");

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
    async execute(message, arguement) {

        if (message.author.id !== this.client.config.riode.id) {
            return;
        };

        if (!arguement[0]) {
            return;
        };

        const root = path.dirname(require.main.filename || process.mainModule.filename);
        const filePath = root + "\\data\\blacklist.json";

        let file = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        let user = this.client.users.cache.get(arguement[0]);

        if (file["blacklist"].includes(arguement[0])) {

            file["blacklist"] = removeFromArray(file["blacklist"], arguement[0]);
            fs.writeFile(filePath, JSON.stringify(file, null, 2), error => {
                if (error) {
                    return console.log(error);
                };
            });

            if (user) {
                warn(user, 2);
                log(this.client, user, 2);
            };

            message.channel.send("✅ The user is no longer on blacklist");

        } else {

            file["blacklist"].push(arguement[0]);

            fs.writeFile(filePath, JSON.stringify(file, null, 2), error => {
                if (error) {
                    return console.log(error);
                };
            });

            if (user) {
                warn(user, 1);
                log(this.client, user, 1);
            };

            message.channel.send("✅ The user is now on blacklist");
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