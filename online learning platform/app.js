const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss');
const multer = require('multer');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/edulearn')
.then(() => console.log("MongoDB connected"));


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/edulearn'
    }),
    cookie: { maxAge: 1000 * 60 * 30 }
}));

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "https://s3.amazonaws.com"],
            scriptSrc: ["'self'", "https://js.stripe.com"]
        }
    }
}));


const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
});
app.use('/login', loginLimiter);


const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
    role: String 
}));


app.post('/register', async (req, res) => {
    const { email, password, role } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ message: "Weak password" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hash, role });

    res.json(user);
});


app.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ message: "User not found" });

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) return res.status(401).json({ message: "Wrong password" });

    req.session.user = user;

    res.json({ message: "Login success" });
});


function requireRole(role) {
    return (req, res, next) => {
        if (!req.session.user || req.session.user.role !== role) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
}

app.post('/course', requireRole('instructor'), (req, res) => {
    const safeText = xss(req.body.description);
    res.json({ message: "Course created", description: safeText });
});


app.post('/quiz', (req, res) => {
    // prevent resubmission
    if (req.session.submitted) {
        return res.status(400).json({ message: "Already submitted" });
    }

    req.session.submitted = true;
    res.json({ message: "Quiz submitted" });
});


const upload = multer({
    limits: { fileSize: 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error("Only PDF allowed"));
        }
        cb(null, true);
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: "File uploaded safely" });
});


app.post('/message', (req, res) => {
    const msg = xss(req.body.text);
    res.json({ message: msg });
});

app.listen(3000, () => console.log("Server running"));