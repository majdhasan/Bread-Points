const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const ShopSchema = Schema({
  name: {
    type: String,
  },
  email: { type: String, require: true, index: true, unique: true },
  password: { type: String, require: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  joined: { type: Date, default: new Date() },
});

ShopSchema.pre('save', async function (next) {
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

ShopSchema.methods.isPasswordMatch = (password, hashed, callback) => {
  bcrypt.compare(password, hashed, (err, success) => {
    if (err) return callback(err);
    callback(null, success);
  });
};

ShopSchema.methods.toJSON = function () {
  const shopObject = this.toObject();
  delete shopObject.password;
  return shopObject;
};

const Shop = mongoose.model('Shop', ShopSchema);
module.exports = Shop;
