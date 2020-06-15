const express = require('express');
const app = express();

const SigletonElements = require('../singleton/singleton');
const { setNewTransaction } = require('../controller/transaction.controller');

const pubsub = SigletonElements.getPubSub();

app.post('', setNewTransaction);

module.exports = app;
