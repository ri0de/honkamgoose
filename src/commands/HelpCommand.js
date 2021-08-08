const Command = require("../Command");

class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help"
        });
    };
    
    /**
     * @param {Message} message
     */
    async execute (message) {
        
        return message.channel.send({
            embeds: [
                {
                    author: {
                        name: String(this.client.user.username),
                        iconURL: String(this.client.user.displayAvatarURL())
                    },
                    color: "#9098f3",
                    description: `A Discord Bot based on the game \"Untitled Goose\" \n\n** Prefix: \`${this.client.config.prefix}\`**`,
                    fields: [
                        {
                            name: `Commands[${global.commands.size}]`,
                            value: "`honk` `invite` `uptime` `ping`"
                        }
                    ],
                    footer: {
                        text: String(message.member.displayName),
                        iconURL: String(message.author.displayAvatarURL())
                    }
                }
            ]
        });
    };
};

module.exports = Help;