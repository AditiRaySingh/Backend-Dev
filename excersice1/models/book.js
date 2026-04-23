const mongoose = require("../db/connect");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    available: Boolean,
    user: String
});

module.exports = mongoose.model("Book", bookSchema);