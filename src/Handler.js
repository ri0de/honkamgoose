const Command = require("./Command");
const fs = require("fs");
const path = require("path");

/**
 * @param {Client} client 
 * @param {Collection} collection 
 */
module.exports = async (client, collection) => {

    fs.readdirSync(__dirname + client.config.directory.commands).forEach(file => {

        const resolve = require(path.resolve(__dirname + `\\commands\\${file}`))
        const command = new resolve(client);

        if (!(command instanceof (Command))) {
            return;
        };

        if (Array.isArray(command.name)) {
            command.name.forEach(name => {
                collection.set(name, command);
            });
        } else {
            collection.set(command.name, command);
        };
    });
};