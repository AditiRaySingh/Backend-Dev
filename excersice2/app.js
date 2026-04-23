const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

// session setup
app.use(session({
    secret: 'cart-secret',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});


app.post('/cart/add', (req, res) => {
    const { productId, price } = req.body;

    const item = req.session.cart.find(i => i.productId === productId);

    if (item) {
        item.quantity++;
    } else {
        req.session.cart.push({ productId, price, quantity: 1 });
    }

    res.json(req.session.cart);
});

app.delete('/cart/remove/:id', (req, res) => {
    req.session.cart = req.session.cart.filter(i => i.productId != req.params.id);
    res.json(req.session.cart);
});


app.get('/cart', (req, res) => {
    const total = req.session.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    res.json({ cart: req.session.cart, total });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});