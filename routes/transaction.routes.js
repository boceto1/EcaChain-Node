const express = require('express');
const app = express();

const { setNewTransaction } = require('../controller/transaction.controller');

app.post('', setNewTransaction);

module.exports = app;
