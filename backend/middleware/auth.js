const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            error: 'Server auth misconfigured',
            details: 'JWT_SECRET is not set in environment variables',
        });
    }

    const authHeader = req.headers.authorization || '';
    const [, token] = authHeader.split(' ');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = { requireAuth };
