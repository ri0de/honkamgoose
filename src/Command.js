const { Client } = require("discord.js");

class Command {
    /**
     * @param {Client} client
     */
    constructor(client, data) {
        this.client = client;
        this.name = data.name;
    };
    
    /**
     * @param {Message} message
     */
    async execute (message) {
        return;
    };
};

module.exports = Command;