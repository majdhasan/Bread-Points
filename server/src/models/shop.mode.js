const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShopSchema = Schema({});

const Shop = mongoose.model('Shop', ShopSchema);
module.exports = Shop;
