const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Token = require('../models/Token');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;

    if (!token) return res.sendStatus(401);

    try {
        const tokenDoc = await Token.findOne({ token });

        if (!tokenDoc) {
            return res.sendStatus(403);
        }

         console.log(new Date(tokenDoc.createdAt).getTime() + (86400 * 1000));
         console.log(Date.now());
        const isTokenExpired = (new Date(tokenDoc.createdAt).getTime() + (86400 * 1000)) < Date.now();
        if (isTokenExpired) {
            return res.sendStatus(403);
        }

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log(user);
            userObj = await User.findOne({ email: user.name });
            if (userObj) {
                req.user = userObj;
            } else {
                console.log(user.name);
                return res.sendStatus(403);
            }
            console.log(req.user);
            next();
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const authorizeAdmin = (req, res, next) => {
    console.log(req.user);
    console.log();
    if (req.user.userType !== 'admin') {
        return res.sendStatus(403);
    }
    next();
};

module.exports = { authenticateToken, authorizeAdmin };
