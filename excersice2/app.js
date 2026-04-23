const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyMFA, SECRET } = require('./auth');

const app = express();
app.use(express.json());


app.post('/login', (req, res) => {
    const user = { id: 1, name: "Aditi" };

    const token = jwt.sign(user, SECRET);

    res.json({
        message: "Login success",
        token: token,
        otp: "123456" 
    });
});

app.get('/secure', verifyMFA, (req, res) => {
    res.json({ message: "MFA Success " });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});