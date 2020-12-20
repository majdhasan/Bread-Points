const Shop = require('../models/shop.model');

const shopController = {};

// expenseController.create = async (req, res, next) => {
//   const { amount, description, date } = req.body;
//   const newExpense = new Expense({
//     amount,
//     description,
//     date,
//     creator: req.user,
//   });
//   try {
//     const saved = await newExpense.save();
//     return res.send({
//       success: true,
//       expense: saved,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

module.exports = shopController;
