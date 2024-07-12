const bcrypt = require("bcrypt");
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
		let { email, password, firstName, lastName, userType } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Ensure userType is either 'user' or 'admin'
		if (userType !== "user" && userType !== "admin") {
			userType = "user"; // Default to 'user' if invalid type is provided
		}

		const user = new User({
			email,
			password: hashedPassword,
			firstName,
			lastName,
			userType,
		});

		await user.save();

		// Don't send the password back in the response
		const userResponse = user.toObject();
		delete userResponse.password;

		res.status(201).json(userResponse);
	} catch (error) {
		console.log(error);
		if (error.code === 11000) {
			// This error code indicates a duplicate key error (e.g., email already exists)
			res.status(400).json({ error: "Email already exists" });
		} else {
			res.status(400).json({ error: "Bad Request" });
		}
	}
};

// Update an existing user
const updateUser = async (req, res) => {
	try {
		const { password, userType, ...otherFields } = req.body;
		const updateFields = { ...otherFields };

		// If a new password is provided, hash it
		if (password) {
			updateFields.password = await bcrypt.hash(password, 10);
		}

		// Validate userType
		if (userType) {
			if (userType !== "user" && userType !== "admin") {
				return res.status(400).json({ error: "Invalid user type" });
			}
			updateFields.userType = userType;
		}

		// Update the user
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{ ...updateFields, updatedAt: new Date() },
			{
				new: true,
				runValidators: true,
				select: "-password", // Exclude password from the returned document
			},
		);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(user);
	} catch (error) {
		console.log(error);
		if (error.name === "ValidationError") {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal Server Error" });
		}
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
