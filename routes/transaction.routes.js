const express = require('express');
const app = express();
const SigletonElements = require('../singleton/singleton');

const pubsub = SigletonElements.getPubSub();

app.post('', (req, res) => {
  const eca = req.body;
  pubsub.broadcastTransaction(eca);
  res.json(eca);
});

module.exports = app;
