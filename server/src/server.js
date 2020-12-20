const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

const clientV1 = require('./routes/clientV1');
const shopV1 = require('./routes/shopV1');

const port = process.env.PORT || 5000;

const app = express();

// ------------ DB Config --------------//
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(
  process.env.URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    err
      ? console.log(err)
      : console.log('Successfuly connected to the database');
  },
);

// ------------ Middleware --------------//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
// require("./config/passport")(passport);

// ------------ Routes --------------//
app.use('/api/client/v1', clientV1);
app.use('/api/shop/v1', shopV1);

// ------------ Errors --------------//

app.use((req, res, next) => {
  //404 Not Found
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

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
