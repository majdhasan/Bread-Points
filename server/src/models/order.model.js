const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = Schema({
  description: { type: String },
  amount: { type: Number, require: true },
  openAmount: { type: Number, require: true },
  shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  /**
   * status:
   * pending, paid, canceled
   */
  status: { type: String, default: 'pending' },
  issuedOn: { type: Date, default: new Date() },
  paidOn: { type: Date },
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
