const express = require('express');
const app = express();

const {
  setNewTransaction,
  mineTransaction,
  getTransactionBalance,
} = require('../controller/transaction.controller');

app.post('', setNewTransaction);
app.post('/mine/:id', mineTransaction);

app.get('/balance', getTransactionBalance);

module.exports = app;
