const express = require("express");
const app = express();

// Middleware to log response time
app.use(function(req, res, next) {

    const start = Date.now(); 

    res.on("finish", function() {
        const end = Date.now(); 
        console.log("Response Time:", end - start, "ms");
    });

    next();  
});

app.get("/", function(req, res) {
    res.send("Hello");
});


app.listen(3000, function() {
    console.log("Server started on port 3000");
});
