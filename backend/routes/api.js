const express = require('express');
const { order, getAllOrders } = require('../controllers/orderController');
const { login, me } = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/status', (req, res) => {
    res.json({ status: 'API is running'});
});

// Auth
router.post('/auth/login', login);
router.get('/auth/me', requireAuth, me);

router.post('/order', order)
router.get('/orders', requireAuth, getAllOrders);

module.exports = router;