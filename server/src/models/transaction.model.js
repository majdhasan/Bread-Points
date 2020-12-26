const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = Schema({
  amount: { type: Number, require: true },
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  issuer: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'transactionSide',
  },
  receiver: {
    type: Schema.Types.ObjectId,
    refPath: 'transactionSide',
  },
  issuerModel: {
    type: String,
    required: true,
    enum: ['Shop', 'Customer'],
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ['Shop', 'Customer'],
  },
  /**
   * Type: charge, payment, reimbursement
   */

  type: { type: String, require: true },

  /**
   * Status: pending ,issued, failed
   */

  status: { type: String, default: 'pending' },
  issuedOn: { type: Date, default: new Date() },
  closedOn: { type: Date },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
