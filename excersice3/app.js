

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/library");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    available: Boolean,
    user: String
});

const Book = mongoose.model("Book", bookSchema);

app.post("/add", function(req, res) {
    let b = new Book(req.body);
    b.save();
    res.send("book added");
});

app.get("/author", function(req, res) {
    Book.find({ author: req.query.name })
    .then(function(data) {
        res.send(data);
    });
});

app.put("/update/:id", function(req, res) {
    Book.findByIdAndUpdate(req.params.id, { available: true })
    .then(function() {
        res.send("updated");
    });
});

app.get("/borrowed", function(req, res) {
    Book.find({ user: req.query.user })
    .then(function(data) {
        res.send(data);
    });
});

app.listen(3000, function() {
    console.log("running");
});