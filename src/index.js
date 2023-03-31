/* eslint-disable no-undef */
require('dotenv').config();
const request = require('request');
const mongoose = require('mongoose');

const app = require('./app');
const SigletonElements = require('./singleton/singleton');
const DbBlock = require('./model/Block').default;
const singleton = require('./singleton/singleton');
const TransactionPool = require('./transactions/TransactionPool');

const ROOT_NODE_ADDRESS = process.env.ROOT_NODE_ADDRESS;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.DEFAULT_PORT;

const syncChains = () => {
  request(
    { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const rootChain = JSON.parse(body);
        console.log('replace chain on a sync with', rootChain);
        SigletonElements.getBlockchain().replaceChain(rootChain);
      }
    },
  );
};

const syncTransactionDataPool = () => {
  request(
    { url: `${ROOT_NODE_ADDRESS}/api/data/transactions` },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const rootTransactionPoolMap = JSON.parse(body);

        console.log(
          'replace transaction pool data map on a sync with',
          rootTransactionPoolMap,
        );
        const comingMap = TransactionPool.transformObjectToMap(
          rootTransactionPoolMap,
        );

        SigletonElements.getTransactionDataPool().setMap(comingMap);
      }
    },
  );
};

const syncBlockDatabase = async () => {
  const blocks = await DbBlock.find();
  const formatedBlocks = blocks.map(block => ({
    timestamp: block.timestamp,
    lastHash: block.lastHash,
    hash: block.hash,
    data: block.data,
    nonce: block.nonce,
    difficulty: block.difficulty,
  }));

  if (
    formatedBlocks.length === 0 ||
    process.env.GENERATE_PEER_PORT === 'true'
  ) {
    const genesisBlock = SigletonElements.getBlockchain().chain[0];
    const genesisDbBlock = new DbBlock(genesisBlock);
    await genesisDbBlock.save();
    return;
  }

  singleton.getBlockchain().replaceChain(formatedBlocks);
};

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, _) => {
    if (err) throw err;
    console.log('Conexion establecida...');

    app.listen(PORT, () => {
      console.log(`listening at localhost: ${PORT}`);
      syncBlockDatabase().then(() => {
        if (process.env.GENERATE_PEER_PORT === 'true' || PORT !== 3000) {
          syncChains();
          syncTransactionDataPool();
        }
      });
    });
  },
);
