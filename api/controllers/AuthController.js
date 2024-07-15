const bcrypt = require("bcrypt");
const User = require("../models/User");
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		const authUser = await User.findOne({ email: email, userType: "admin" });
		if (!authUser || !(await bcrypt.compare(password, authUser.password))) {
			return res
				.status(401)
				.json({ error: "Invalid credentials or not authorized" });
		}

		const token = await generateAndSaveToken(authUser);
		res.json({ token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		const authUser = await User.findOne({ email: email });
		if (!authUser || !(await bcrypt.compare(password, authUser.password))) {
			return res.status(401).json({ error: "Invalid username or password" });
		}

		const token = await generateAndSaveToken(authUser);
		res.json({ token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const generateAndSaveToken = async (user) => {
	const existingToken = await Token.findOne({ userId: user._id });
	if (
		existingToken &&
		new Date(existingToken.createdAt).getTime() + 86400 * 1000 > Date.now()
	) {
		return existingToken.token;
	}

	const token = generateAccessToken(user.email);
	const tokenDoc = new Token({ userId: user._id, token });
	await tokenDoc.save();
	return token;
};

const generateAccessToken = (username) => {
	const tokenSecret = process.env.TOKEN_SECRET;
	return jwt.sign({ name: username }, tokenSecret, { expiresIn: 86400 });
};

const signup = async (req, res) => {
	try {
		let { email, password, firstName, lastName, userType } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		password = await bcrypt.hash(password, 10);
		await User.create({
			email,
			password,
			firstName,
			lastName,
			userType,
		});
		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = { adminLogin, login, signup };

