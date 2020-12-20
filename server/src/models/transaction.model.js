const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = Schema({});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
