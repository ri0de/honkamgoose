const Command = require("../Command");
const fs = require("fs");
const path = require("path");

class Honk extends Command {
    constructor(client) {
        super(client, {
            name: ["honk", "goose"]
        });
    };

    /**
     * @param {Message} message
     */
    async execute(message) {

        const images = [];
        const root = path.dirname(require.main.filename || process.mainModule.filename);
        const folderPath = "\\data\\images";

        fs.readdirSync(root + folderPath).forEach(file => {
            images.push(path.resolve(root + folderPath + "\\" + file));
        });

        const Image = images[Math.floor(Math.random() * images.length)];
        const attachment = new (require("discord.js").MessageAttachment)(Image, "honk.png");

       return message.channel.send({
            embeds: [
                {
                    title: String(this.client.user.username + "!"),
                    color: "#d7d8da",
                    image: {
                        url: "attachment://honk.png"
                    },
                    footer: {
                        text: String(message.member.displayName) + `(${message.author["id"]})`,
                        iconURL: String(message.author.displayAvatarURL())
                    },
                    timestamp: Date.now()
                }
            ],
            files: [attachment]
       });
    };
};

module.exports = Honk;