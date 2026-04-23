const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const ACCESS_SECRET = 'access-secret';
const REFRESH_SECRET = 'refresh-secret';

const users = [
    { id: 1, email: "test@gmail.com", password: "1234" }
];

const refreshTokens = new Set();

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
    const token = jwt.sign(user, REFRESH_SECRET, { expiresIn: '7d' });
    refreshTokens.add(token);
    return token;
}

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken({ id: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.json({ accessToken, refreshToken });
});

app.post('/token/refresh', (req, res) => {
    const { token } = req.body;

    if (!token || !refreshTokens.has(token)) return res.sendStatus(403);

    jwt.verify(token, REFRESH_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = generateAccessToken({ id: user.id });
        res.json({ accessToken });
    });
});

app.post('/logout', (req, res) => {
    refreshTokens.delete(req.body.token);
    res.json({ message: "Logged out" });
});

function authenticateToken(req, res, next) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));