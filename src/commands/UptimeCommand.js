const Command = require("../Command");

const moment = require("moment");
require("moment-duration-format");

class Uptime extends Command {
    constructor(client) {
        super(client, {
            name: "uptime"
        });
    };
    
    /**
     * @param {Message} message
     */
    execute (message) {

        const timeInMs = this.client.uptime;
        const uptime = moment.duration(timeInMs).format("d [days], h [hours], m [minutes], s [seconds]");

        return message.channel.send({
            embeds: [
                {
                    author: {
                        name: String(this.client.user.username),
                        iconURL: String(this.client.user.displayAvatarURL())
                    },
                    title: "Uptime",
                    description: String(uptime),
                    color: "#1fa6ff",
                    footer: {
                        text: String(message.member.displayName),
                        iconURL: String(message.author.displayAvatarURL({ dynamic: true}))
                    }
                }
            ]
        });
    };
};

module.exports = Uptime;