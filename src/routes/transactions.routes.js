const express = require('express');
const app = express();

const {
  setNewTransaction,
  mineTransaction,
  getTransactionPool,
} = require('../controller/transactionData.controller');

app.post('', setNewTransaction);

app.post('/:id', mineTransaction);

app.get('', getTransactionPool);

module.exports = app;
