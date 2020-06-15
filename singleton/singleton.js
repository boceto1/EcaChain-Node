const Blockchain = require('../blockchain');
const TransactionPool = require('../register/transaction-pool');
const PubSub = require('../pubsub/pubsub');

const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const pubSub = new PubSub();
pubSub.setBlockchain(blockchain);
pubSub.setTransactionPool(transactionPool);

const getBlockchain = () => blockchain;
const getTransactionPool = () => transactionPool;
const getPubSub = () => pubSub;

module.exports = {
  getBlockchain,
  getTransactionPool,
  getPubSub,
};
