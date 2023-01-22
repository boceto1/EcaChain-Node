const express = require('express');
const app = express();

const {
  getTransactionPool,
  mineTransaction,
  setNewTransaction,
} = require('../controller/transactionData.controller');

app
  .route('')
  .get(getTransactionPool)
  .post(setNewTransaction);

app.route(':id').post(mineTransaction);

module.exports = app;
