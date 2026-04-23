const express = require('express');
const logger = require('./logger');

const app = express();

app.use(logger);

app.get('/', (req, res) => {
    res.send("Hello Logger");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});