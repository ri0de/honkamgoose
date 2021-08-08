const Command = require("../Command");


class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping"
        });
    };
    
    /**
     * @param {Message} message
     */
    async execute (message) {
        return message.channel.send({
            content: `<:goose:873568411727319131> Honk!\n- \`${Date.now() - message.createdTimestamp}ms\``
        })
    };
};

module.exports = Ping;