const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/library");

const db = mongoose.connection;

db.on("open", () => {
    console.log("database connected");
});

module.exports = mongoose;