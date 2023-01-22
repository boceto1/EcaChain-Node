const Blockchain = require('../blockchain');
const TransactionPool = require('../register/transaction-pool');
const { TransactionPool: TransactionDataPool } = require('../transactions');
const PubSub = require('../pubsub/pubsub');

const blockchain = new Blockchain();
const transactionPool = new TransactionPool(); //ECA-Chain
const transactionDataPool = new TransactionDataPool(); // DeEdu
const pubSub = new PubSub();
pubSub.setBlockchain(blockchain);
pubSub.setTransactionPool(transactionPool);
pubSub.setTransactionDataPool(transactionDataPool);

const getBlockchain = () => blockchain;
const getTransactionPool = () => transactionPool;
const getTransactionDataPool = () => transactionDataPool;
const getPubSub = () => pubSub;

module.exports = {
  getBlockchain,
  getTransactionPool,
  getPubSub,
  getTransactionDataPool,
};
