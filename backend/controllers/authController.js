const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const login = async (req, res) => {
    try {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                error: 'Server auth misconfigured',
                details: 'JWT_SECRET is not set in environment variables',
            });
        }

        const { username, password } = req.body ?? {};
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findOne({ username: String(username).trim() });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const ok = await bcrypt.compare(String(password), user.passwordHash);
        if (!ok) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { sub: user._id.toString(), username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        return res.status(200).json({
            success: true,
            token,
            user: { id: user._id, username: user.username, role: user.role },
        });
    } catch (error) {
        return res.status(500).json({ error: 'Login failed', details: error.message });
    }
};

const me = async (req, res) => {
    // req.user comes from middleware
    return res.status(200).json({ user: req.user });
};

module.exports = { login, me };
