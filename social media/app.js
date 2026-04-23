const express = require('express');
const session = require('express-session');
const cors = require('cors');
const xss = require('xss');
const validator = require('validator');

const app = express();
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30 
    }
}));

function sanitizeInput(req, res, next) {
    for (let key in req.body) {
        if (typeof req.body[key] === 'string') {
            req.body[key] = xss(req.body[key]);
        }
    }
    next();
}

app.use(sanitizeInput);


let users = [];
let posts = [];
let messages = [];

app.post('/register', (req, res) => {
    const { username, email, bio, profileUrl } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    if (!validator.isURL(profileUrl)) {
        return res.status(400).json({ message: "Invalid profile URL" });
    }

    users.push({ username, email, bio, profileUrl });

    res.json({ message: "User registered" });
});

app.post('/login', (req, res) => {
    req.session.user = { name: req.body.username };
    res.json({ message: "Login success" });
});


app.post('/post', (req, res) => {
    
    const safePost = xss(req.body.text, {
        whiteList: {
            b: [], i: [], a: ['href']
        }
    });

    posts.push({ text: safePost });

    res.json(posts);
});

app.post('/message', (req, res) => {
    messages.push({
        from: req.session.user?.name,
        text: req.body.text 
    });

    res.json(messages);
});


app.get('/posts', (req, res) => {
    res.json(posts);
});


app.get('/messages', (req, res) => {
    res.json(messages);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});