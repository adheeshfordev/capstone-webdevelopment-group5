const User = require("../models/User");

// Get all users (excluding password and _id fields)
const userList = async (req, res) => {
	try {
		const users = await User.find({}, { password: 0 });
		res.header("Content-Range", `users 0-${users.length - 1}/${users.length}`);
		res.json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Create a new user
const createUser = async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: "Bad Request" });
	}
};

// Update an existing user
const updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: "Bad Request" });
	}
};

// Delete a user
const deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json({ message: "User deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id, { password: 0 });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json({ user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = { getUser, userList, createUser, updateUser, deleteUser };
