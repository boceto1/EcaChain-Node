class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }

  clear() {
    this.transactionMap = {};
  }

  clearTransaction(id) {
    delete this.transactionMap[id];
  }

  setTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }

  getTransaction(id) {
    if (!this.transactionMap[id]) return null;
    return this.transactionMap[id];
  }

  setMap(transactionPool) {
    this.transactionMap = transactionPool;
  }
}

module.exports = TransactionPool;
