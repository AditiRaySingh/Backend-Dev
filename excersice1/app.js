const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

const users = [];


function validatePassword(password) {
    const errors = [];

    if (password.length < 8) errors.push("Min 8 characters required");
    if (!/[A-Z]/.test(password)) errors.push("Must contain uppercase");
    if (!/[a-z]/.test(password)) errors.push("Must contain lowercase");
    if (!/[0-9]/.test(password)) errors.push("Must contain number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("Must contain special character");

    return errors;
}


app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
    }

    const errors = validatePassword(password);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
        username,
        email,
        password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully" });
});

app.listen(3000, () => console.log("Server running on port 3000"));