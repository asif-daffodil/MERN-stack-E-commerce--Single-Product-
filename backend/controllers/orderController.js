const Order = require('../model/order');

const order = (req, res) => {
    const { name = '', mobile = '', address = '', orderNote = '', deliveryArea = '', productName = '', productPrice = '', quantity = '', totalProductPrice = '', deliveryCharge = '', totalAmount = '' } = req.body ?? {};
    if (!name || !mobile || !address || !deliveryArea || !productName || !productPrice || !quantity || !totalProductPrice || !deliveryCharge || !totalAmount) {
        return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    const newOrder = new Order({
        name,
        mobile,
        address,
        orderNote,
        area: deliveryArea,
        product_name: productName,
        product_price: productPrice,
        quantity,
        total_product_price: totalProductPrice,
        delivery_charge: deliveryCharge,
        total_price: totalAmount
    });

    newOrder.save()
        .then(() => res.status(201).json({ success: true }))
        .catch(error => res.status(500).json({ error: 'Failed to create order', details: error.message }));
};

const getAllOrders = (req, res) => {
    Order.find()
        .then(orders => res.status(200).json(orders))
        .catch(error => res.status(500).json({ error: 'Failed to retrieve orders', details: error.message }));
};

module.exports = {
    order,
    getAllOrders
};