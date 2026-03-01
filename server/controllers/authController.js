const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

/**
 * Register a user
 */
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role, department } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'citizen',
            department: department || null,
        });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * Login a user
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * Helper: Get token from model, create cookie and send response
 */
const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
};
