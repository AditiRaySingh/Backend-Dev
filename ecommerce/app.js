const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30 // 30 min (fix short session problem)
    }
}));

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
});

app.use('/login', limiter);


let products = [
    { name: "Laptop", price: 50000 },
    { name: "Phone", price: -100 } // bad data
];

let reviews = [];


app.post('/login', (req, res) => {
    req.session.user = { name: "user1" };
    res.json({ message: "Login success" });
});

app.get('/search', (req, res) => {
    const q = req.query.q;

    if (typeof q !== 'string') {
        return res.status(400).json({ message: "Invalid search" });
    }

    const result = products.filter(p =>
        p.name.includes(q) && p.price >= 0 // no negative price
    );

    res.json(result);
});

app.post('/review', (req, res) => {
    const safeText = xss(req.body.text);

    reviews.push({ text: safeText });

    res.json({ message: "Review added", reviews });
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});