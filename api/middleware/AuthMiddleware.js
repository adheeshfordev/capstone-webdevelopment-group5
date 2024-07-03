const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Token = require('../models/Token');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;

    if (!token) return res.sendStatus(401);

    try {
        const tokenDoc = await Token.findOne({ token });

        if (!tokenDoc) {
            return res.sendStatus(403);
        }

        const isTokenExpired = new Date(tokenDoc.createdAt).getTime() + 86400 * 1000 < Date.now();
        if (isTokenExpired) {
            return res.sendStatus(403);
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

module.exports = { authenticateToken };
