// const Transaction = require('./transaction');

class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }

  clear() {
    this.transactionMap = {};
  }

  setTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction;
    this.pubsub.broadcastTransaction(transaction);
  }

  setMap(transactionMap) {
    this.transactionMap = transactionMap;
  }
}

module.exports = TransactionPool;
