const express = require("express");
const app = express();

app.get("/stock", function(req, res) {
    res.send("CA");
});


app.get("/cdn", function(req, res) {
    res.send("AP");
});

app.get("/airline", function(req, res) {
    res.send("CP");
});

app.get("/video", function(req, res) {
    res.send("AP");
});


app.listen(3000, function() {
    console.log("running");
});