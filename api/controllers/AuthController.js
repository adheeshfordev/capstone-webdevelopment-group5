const bcrypt = require('bcrypt')
const user = require('../models/User')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
 
       const authUser = await user.findOne({email : email});
       console.log(authUser);
        if (!authUser || !(await bcrypt.compare(password, authUser.password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
 
        const token = generateAccessToken(authUser.email);
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
 }

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