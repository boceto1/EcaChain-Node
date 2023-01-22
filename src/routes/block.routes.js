const express = require('express');
const app = express();
const SigletonElements = require('../singleton/singleton');

const blockchain = SigletonElements.getBlockchain();
const pubsub = SigletonElements.getPubSub();

app.get('', (req, res) => {
  res.json(blockchain.chain);
});

app.post('/mine', async (req, res) => {
  const { data } = req.body;
  await blockchain.addBlock({ data });
  pubsub.broadcastChain();
  res.redirect('/api/blocks');
});

module.exports = app;
