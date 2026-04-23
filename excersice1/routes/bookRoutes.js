const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// 1. Add book
router.post("/add", async function(req, res) {
    let b = new Book(req.body);
    await b.save();
    res.send("book added");
});

// 2. Find by author
router.get("/author", async function(req, res) {
    let data = await Book.find({ author: req.query.name });
    res.send(data);
});

// 3. Update availability
router.put("/update/:id", async function(req, res) {
    await Book.findByIdAndUpdate(req.params.id, { available: true });
    res.send("updated");
});

// 4. Track borrowed books
router.get("/borrowed", async function(req, res) {
    let data = await Book.find({ user: req.query.user });
    res.send(data);
});

module.exports = router;