/* eslint-disable no-undef */
require('dotenv').config();
const request = require('request');
const mongoose = require('mongoose');

const app = require('./app');
const SigletonElements = require('./singleton/singleton');
const DbBlock = require('./model/Block');
const singleton = require('./singleton/singleton');
const TransactionPool = require('./transactions/TransactionPool');

const DEFAULT_PORT = Number.parseInt(process.env.DEFAULT_PORT);
const ROOT_NODE_ADDRESS = process.env.ROOT_NODE_ADDRESS;

const getMongoURIByPort = port => {
  if (port === 3000) {
    console.log(`Connected to DB: ${process.env.MONGO_URI_1} `);
    return process.env.MONGO_URI_1;
  }

  if (port === 3001) {
    console.log(`Connected to DB: ${process.env.MONGO_URI_2} `);
    return process.env.MONGO_URI_2;
  }

  if (port === 3002) {
    console.log(`Connected to DB: ${process.env.MONGO_URI_3} `);
    return process.env.MONGO_URI_3;
  }

  if (port === 3003) {
    console.log(`Connected to DB: ${process.env.MONGO_URI_1} `);
    return process.env.MONGO_URI_1;
  }

  return null;
};

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

const syncTransactionPool = () => {
  request({ url: `${ROOT_NODE_ADDRESS}/api/pool` }, (error, response, body) => {
    console.log('i am here', body);
    if (!error && response.statusCode === 200) {
      const rootTransactionPoolMap = JSON.parse(body);

      console.log(
        'replace transaction pool map on a sync with',
        rootTransactionPoolMap,
      );
      SigletonElements.getTransactionPool().setMap(
        rootTransactionPoolMap.transactionPool,
      );
    }
  });
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

const PORT = DEFAULT_PORT;

mongoose.connect(
  getMongoURIByPort(DEFAULT_PORT),
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, _) => {
    if (err) throw err;
    console.log('Conexion establecida...');

    app.listen(PORT, () => {
      console.log(`listening at localhost: ${PORT}`);
      syncBlockDatabase().then(() => {
        if (process.env.GENERATE_PEER_PORT === 'true' || PORT !== 3000) {
          syncChains();
          // syncTransactionPool();
          syncTransactionDataPool();
        }
      });
    });
  },
);
