const express = require('express');
const mongoose = require('mongoose');
const User = require('./userModel');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


app.post('/login', async (req, res) => {
    let user = await User.findOne({ name: req.body.name });

    if (!user) {
        user = new User({ name: req.body.name });
    }

    user.lastLogin = new Date();
    await user.save();

    res.json({ message: "Login success", user });
});


app.post('/logout', async (req, res) => {
    const user = await User.findOne({ name: req.body.name });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.lastLogout = new Date();
    await user.save();

    res.json({ message: "Logout success", user });
});


app.get('/user/:name', async (req, res) => {
    const user = await User.findOne({ name: req.params.name });
    res.json(user);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});