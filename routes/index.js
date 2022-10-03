const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use('/blocks', require('./block.routes'));
app.use('/transactions', require('./transaction.routes'));
app.use('/pool', require('./transactionPool.routes'));
app.use('/data/transactions', require('./transactions.routes'));

app.use('/data/user', require('./userdata.routes'));

module.exports = app;
