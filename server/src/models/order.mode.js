const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = Schema({});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
