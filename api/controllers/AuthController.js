const bcrypt = require('bcrypt')
const User = require('../models/User')
const Token = require('../models/Token')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const authUser = await User.findOne({ email: email });
        if (!authUser || !(await bcrypt.compare(password, authUser.password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Check for an existing valid token
        const existingToken = await Token.findOne({ userId: authUser._id });
        if (existingToken && new Date(existingToken.createdAt).getTime() + 86400 * 1000 > Date.now()) {
            return res.json({ token: existingToken.token });
        }

        // Generate a new token
        const token = generateAccessToken(authUser.email);
        const tokenDoc = new Token({ userId: authUser._id, token });
        await tokenDoc.save();
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

 const signup = async (req, res) => {
    try {
        let { email, password, firstName, lastName, type } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
 
        password = await bcrypt.hash(password, 10);
        await user.create({
            email,
            password,
            firstName,
            lastName,
            type
        });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
 }

 const  generateAccessToken = (username) => {
    const tokenSecret=process.env.TOKEN_SECRET
    return jwt.sign({name: username}, tokenSecret, { expiresIn: 1800 });
  }

 module.exports = {login, signup}