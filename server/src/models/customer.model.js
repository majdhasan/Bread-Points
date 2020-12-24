const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const CustomerSchema = Schema({
  name: {
    type: String,
  },
  email: { type: String, require: true, index: true, unique: true },
  password: { type: String, require: true },
  balance: { type: Number, default: 0 },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  joined: { type: Date, default: new Date() },
});

CustomerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  } catch (e) {
    return next(e);
  }
});

CustomerSchema.methods.isPasswordMatch = (password, hashed, callback) => {
  bcrypt.compare(password, hashed, (err, success) => {
    if (err) return callback(err);
    callback(null, success);
  });
};

CustomerSchema.methods.toJSON = function () {
  const customerObject = this.toObject();
  delete customerObject.password;
  return customerObject;
};

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
