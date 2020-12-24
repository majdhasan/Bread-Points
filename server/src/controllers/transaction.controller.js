const Transaction = require('../models/transaction.model');

const transactionController = {};

transactionController.create = async (req, res, next) => {
  const { amount, order, receiverId, type } = req.body;
  const transactionMembersDetails = {};

  if (typeof req.shop === 'undefined') {
    // Transaction issuer is a customer
    transactionMembersDetails.issuer = req.customer._id;
    transactionMembersDetails.issuerModel = 'Customer';
    transactionMembersDetails.receiver = receiverId;
    transactionMembersDetails.receiverModel = 'Shop';
  } else {
    // Transaction issuer is a shop
    transactionMembersDetails.issuer = req.shop._id;
    transactionMembersDetails.issuerModel = 'Shop';
    transactionMembersDetails.receiver = receiverId;
    transactionMembersDetails.receiverModel = 'Customer';
  }

  const newTranscation = new Transaction({
    amount,
    ...transactionMembersDetails,
    type,
    order,
  });

  try {
    const transaction = await newTranscation.save();
    return res.send({ transaction });
  } catch (e) {
    next(e);
  }
};

// transactionController.update = async (req, res, next) => {
//   const { orderId } = req.body;

//   try {
//     const order = await Order.findById(orderId);
//     const order = await order.save();
//     return res.send({ order });
//   } catch (e) {
//     next(e);
//   }
// };

transactionController.get = async (req, res, next) => {
  const { transactionId } = req.body;

  try {
    const transaction = await Transaction.findById(transaction);
    if (!transaction) {
      const err = new Error(
        `The transaction with id ${transactionId} was not found in our system`,
      );
      err.status = 404;
      return next(err);
    }
    return res.send({ transaction });
  } catch (e) {
    next(e);
  }
};

module.exports = transactionController;
