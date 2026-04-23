const express = require("express");
const app = express();

app.use(express.json());

const bookRoutes = require("./routes/bookRoutes");
app.use("/books", bookRoutes);

app.listen(3000, function() {
    console.log("server running");
});