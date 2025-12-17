const express = require('express');
const { order } = require('../controllers/orderController');
const router = express.Router();

router.get('/status', (req, res) => {
    res.json({ status: 'API is running'});
});

router.post('/order', order)

module.exports = router;