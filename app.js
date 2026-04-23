const express = require("express");
const app = express();

app.use(express.json());


let books = [
    { id: 1, title: "Math", author: "Ram", year: 2020 },
    { id: 2, title: "Science", author: "Shyam", year: 2022 },
    { id: 3, title: "English", author: "Ram", year: 2021 }
];

// Exercise 1: 
app.get("/books", function(req, res) {

    let result = books;

    if (req.query.author) {
        result = result.filter(function(b) {
            return b.author == req.query.author;
        });
    }

    if (req.query.year) {
        result = result.filter(function(b) {
            return b.year == req.query.year;
        });
    }

    res.send(result);
});


// Exercise 2
function checkYear(req, res, next) {

    let y = req.query.year;

    if (y) {
        if (isNaN(y) || y < 1900 || y > 2025) {
            res.send("wrong year");
            return;
        }
    }

    next();
}

app.get("/check", checkYear, function(req, res) {
    res.send("ok");
});


// Exercise 3
app.get("/books2", function(req, res) {

    let page = req.query.page || 1;
    let limit = req.query.limit || 2;

    let start = (page - 1) * limit;
    let end = start + Number(limit);

    let result = books.slice(start, end);

    res.send(result);
});


// Exercise 4: simple CRUD for authors
let authors = [];

// add
app.post("/authors", function(req, res) {
    authors.push(req.body);
    res.send("added");
});

// show
app.get("/authors", function(req, res) {
    res.send(authors);
});

// update
app.put("/authors/:id", function(req, res) {
    let id = req.params.id;
    authors[id] = req.body;
    res.send("updated");
});

// delete
app.delete("/authors/:id", function(req, res) {
    let id = req.params.id;
    authors.splice(id, 1);
    res.send("deleted");
});


// Exercise 5: search by title
app.get("/search", function(req, res) {

    let q = req.query.q;

    let result = books.filter(function(b) {
        return b.title.toLowerCase().includes(q.toLowerCase());
    });

    res.send(result);
});


// server
app.listen(3000, function() {
    console.log("server running");
});