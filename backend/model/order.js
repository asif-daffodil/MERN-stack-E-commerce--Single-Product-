const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * name
 * mobile
 * address
 * orderNote
 * area
 * product_name
 * product_price
 * quantity
 * total_product_price
 * delivery_charge
 * total_price
 */
const orderSchema = new Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    orderNote: { type: String },
    area: { type: String, required: true },
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total_product_price: { type: Number, required: true },
    delivery_charge: { type: Number, required: true },
    total_price: { type: Number, required: true },
    order_status: { type: String, default: 'Pending' }
}, { timestamps: true }, { collection: 'orders' });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;