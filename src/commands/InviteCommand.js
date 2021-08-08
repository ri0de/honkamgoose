const Command = require("../Command");

class Invite extends Command {
    constructor(client) {
        super(client, {
            name: "invite"
        });
    };
    
    /**
     * @param {Message} message
     */
    async execute (message) {

        return message.channel.send({
            embeds: [
                {
                    title: "Invite " + this.client.user.username,
                    description: "Click on the button or this [HyperText]" + `(${this.client.config.invite})`,
                    color: "#f1f1f1",
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
                            url: this.client.config.invite,
                            label: "Invite Me"
                        }
                    ]
                }
            ]
        });
    };
};

module.exports = Invite;