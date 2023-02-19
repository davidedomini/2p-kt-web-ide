const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: { type: String },
    surname: { type: String },
    email: { type: String }, 
    username: { type: String }, 
    password: { type: String },
    salt: { type: String }
});

module.exports = mongoose.model('User', UserSchema);