const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    lastLogin: Date,
    lastLogout: Date,
    lastActive: Date
});

userSchema.pre('save', function (next) {
    this.lastActive = new Date(); // auto update
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;