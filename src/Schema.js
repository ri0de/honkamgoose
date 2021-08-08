const { Schema, model } = require("mongoose");const Blacklist = new Schema({ User: { type: String, unique: true }, Time: Date });exports.SchemaBlacklist = model("blacklist", Blacklist);
