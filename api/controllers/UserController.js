const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const profileUpdateValidationRules = () => [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('firstName').not().isEmpty().withMessage('First name is required'),
    body('lastName').not().isEmpty().withMessage('Last name is required'),
];

// Validation rules
const userValidationRules = () => [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('firstName').not().isEmpty().withMessage('First name is required'),
    body('lastName').not().isEmpty().withMessage('Last name is required'),
    body('userType').optional().isIn(['user', 'admin']).withMessage('Invalid user type')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({
        errors: extractedErrors,
    });
};

// Get all users (excluding password and _id fields)
const userList = async (req, res) => {
    try {
        const usersWithoutId = await User.find({}, { password: 0 });
        const users = usersWithoutId.map((user) => {
            return { id: user._id, ...user._doc };
        });
        const totalCount = users.length;
        res.setHeader('Content-Range', `users 0-${users.length}/${totalCount}`);
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new user
const createUser = [
    userValidationRules(),
    validate,
    async (req, res) => {
        try {
            let { email, password, firstName, lastName, userType } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Ensure userType is either 'user' or 'admin'
            if (userType !== 'user' && userType !== 'admin') {
                userType = 'user'; // Default to 'user' if invalid type is provided
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
                res.status(400).json({ error: 'Email already exists' });
            } else {
                res.status(400).json({ error: 'Bad Request' });
            }
        }
    }
];

// Update an existing user
const updateUser = [
    userValidationRules(),
    validate,
    async (req, res) => {
        try {
            const { password, userType, ...otherFields } = req.body;
            const updateFields = { ...otherFields };

            // If a new password is provided, hash it
            if (password) {
                updateFields.password = await bcrypt.hash(password, 10);
            }

            // Validate userType
            if (userType) {
                if (userType !== 'user' && userType !== 'admin') {
                    return res.status(400).json({ error: 'Invalid user type' });
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
                    select: '-password', // Exclude password from the returned document
                },
            );

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            console.log(error);
            if (error.name === 'ValidationError') {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
];

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a single user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, { password: 0 });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUserProfile = [
    profileUpdateValidationRules(),
    validate,
    async (req, res) => {
        try {
            const { email, firstName, lastName } = req.body;
            const updateFields = { email, firstName, lastName };

            // Update the user profile
            const user = await User.findByIdAndUpdate(
                req.user.id,
                { ...updateFields, updatedAt: new Date() },
                {
                    new: true,
                    runValidators: true,
                    select: '-password', // Exclude password from the returned document
                },
            );

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            console.log(error);
            if (error.name === 'ValidationError') {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
];

module.exports = { getUser, userList, createUser, updateUser, deleteUser, updateUserProfile };
