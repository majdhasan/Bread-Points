const mongoose = require('mongoose');
const { Schema } = mongoose;

const CostumerSchema = Schema({});

const Costumer = mongoose.model('Costumer', CostumerSchema);
module.exports = Costumer;
