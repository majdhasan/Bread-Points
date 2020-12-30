const mongoose = require('mongoose');
const { Schema } = mongoose;

const OfferSchema = Schema({
  description: { type: String },
  amount: { type: Number, require: true },
  images: [{ type: String }],
  shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  createdOn: { type: Date, default: new Date() },
  PublishedOn: { type: Date },
});

const Offer = mongoose.model('Offer', OfferSchema);
module.exports = Offer;
