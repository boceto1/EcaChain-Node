const request = require('request');

const app = require('./app');
const SigletonElements = require('./singleton/singleton');

const DEFAULT_PORT = 5000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

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

let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`listening at localhost: ${PORT}`);

  if (PORT !== DEFAULT_PORT) {
    syncChains();
    syncTransactionPool();
  }
});
