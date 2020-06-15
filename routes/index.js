const express = require('express');
const app = express();

app.use('/blocks', require('./block.routes'));
app.use('/transactions', require('./transaction.routes'));

module.exports = app;
