const express = require('express');
const app = express();

const { setNewTransaction } = require('../controller/transaction.controller');
const { mineTransaction } = require('../controller/transaction.controller');

app.post('', setNewTransaction);
app.post('/mine/:id', mineTransaction);

module.exports = app;
