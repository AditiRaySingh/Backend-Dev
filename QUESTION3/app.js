const express = require("express");
const app = express();


app.set("view engine", "ejs");


app.get("/", function(req, res) {
    res.send("Home Page");
});

app.use(function(req, res) {
    res.status(404).render("404");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

