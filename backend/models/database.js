const config = require("../config/dbconfig.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.url;

db.users = require("./user.js")

module.exports = db;