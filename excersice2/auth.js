const jwt = require('jsonwebtoken');

const SECRET = "secret123";
const OTP = "123456"; 

function verifyMFA(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    const otp = req.headers['otp'];

    if (!token || !otp) {
        return res.status(401).json({ message: "Token and OTP required" });
    }

    try {
        jwt.verify(token, SECRET);

        if (otp !== OTP) {
            return res.status(403).json({ message: "Invalid OTP" });
        }

        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = { verifyMFA, SECRET };