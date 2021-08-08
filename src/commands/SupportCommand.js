const Command = require("../Command");

class SupportCommand extends Command {
    constructor(client) {
        super(client, {
            name: ["support", "server"]
        });
    };

     /**
     * @param {Message} message
     */
      async execute (message) {

        return message.channel.send({
            embeds: [
                {
                    title: "Support",
                    description: "Click on the button or this [HyperText]" + `(https://discord.gg/VgK2dar8Sg)`,
                    color: "#dddddd",
                    thumbnail: {
                        url: String(this.client.user.displayAvatarURL())
                    },
                    footer: {
                        text: String(message.member.displayName),
                        iconURL: String(message.author.displayAvatarURL({ dynamic: true}))
                    }
                }
            ],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 5,
                            url: "https://discord.gg/VgK2dar8Sg",
                            label: "Join us"
                        }
                    ]
                }
            ]
        });
    };
};

module.exports = SupportCommand;
