const express = require('express');
const app = express();

app.use('/blocks', require('./block.routes'));
app.use('/transactions', require('./transaction.routes'));
app.use('/pool', require('./transactionPool.routes'));

module.exports = app;
