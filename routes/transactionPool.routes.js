const express = require('express');
const app = express();

const {
  getTransactionPool,
} = require('../controller/transactionPool.controller');

app.get('', getTransactionPool);

module.exports = app;
