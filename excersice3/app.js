const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'auth-secret',
    resave: false,
    saveUninitialized: true
}));


const users = [
    { id: 1, name: "User1", role: "user" },
    { id: 2, name: "Mod1", role: "moderator" },
    { id: 3, name: "Admin1", role: "admin" }
];

const posts = [];


app.get('/login/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.session.user = user;
    res.json({ message: "Logged in", user });
});


const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Login required" });
    }
    next();
};


const requireRole = (role) => {
    return (req, res, next) => {
        if (req.session.user.role === role || req.session.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }
    };
};

const isOwnerOrModerator = (req, res, next) => {
    const post = posts.find(p => p.id == req.params.id);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    if (
        post.userId === req.session.user.id ||
        req.session.user.role === 'moderator' ||
        req.session.user.role === 'admin'
    ) {
        req.post = post;
        next();
    } else {
        return res.status(403).json({ message: "Not allowed" });
    }
};


app.post('/posts', isAuthenticated, (req, res) => {
    const post = {
        id: posts.length + 1,
        userId: req.session.user.id,
        content: req.body.content
    };

    posts.push(post);
    res.json(post);
});


app.put('/posts/:id', isAuthenticated, isOwnerOrModerator, (req, res) => {
    req.post.content = req.body.content;
    res.json(req.post);
});


app.delete('/posts/:id', isAuthenticated, requireRole('moderator'), (req, res) => {
    res.json({ message: "Post deleted" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});