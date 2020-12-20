const express = require('express');
require('dotenv').config();
const logger = require('morgan');
const cors = require('cors');
const passportCustomer = require('passport');
const passportShop = require('passport');

const connectDB = require('./config/db');
const clientV1 = require('./routes/clientV1');
const shopV1 = require('./routes/shopV1');

// ------------ Initialize Express --------------//
const app = express();

// ------------ Connect to MONGODB --------------//
connectDB();

// ---------------- Middleware -----------------//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passportCustomer.initialize());
app.use(passportCustomer.session());
app.use(passportShop.initialize());
app.use(passportShop.session());
app.use(cors());
require('./config/customer.passport')(passportCustomer);
require('./config/shop.passport')(passportShop);

// ----------------- Routes -------------------//
app.use('/api/client/v1', clientV1);
app.use('/api/shop/v1', shopV1);

// ------------ Error Handling --------------//

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const error = err.message || 'Error processing your request';

  res.status(status).send({
    error,
  });
});

// --------------- Start Server -------------- //
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server started in ${process.env.NODE_ENV} on http://localhost:${port}`,
  );
});
