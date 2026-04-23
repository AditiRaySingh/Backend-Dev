const express = require('express');
const mongoose = require('mongoose');
const Item = require('./itemModel');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


app.post('/item', async (req, res) => {
    const item = await Item.create({ name: req.body.name });
    res.json(item);
});


app.delete('/item/:id', async (req, res) => {
    await Item.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: "Item soft deleted" });
});


app.get('/item', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});