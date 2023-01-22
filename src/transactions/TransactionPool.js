class TransactionPool {
  constructor() {
    this.transactionMap = new Map();
  }

  clear() {
    this.transactionMap.clear();
  }

  clearTransaction(id) {
    if (this.transactionMap.has(id)) {
      this.transactionMap.delete(id);
    } else {
      throw new Error('Transacction not found');
    }
  }

  setTransaction(id, data) {
    this.transactionMap.set(id, data);
  }

  getTransaction(id) {
    if (this.transactionMap.has(id)) {
      return this.transactionMap.get(id);
    }
    return null;
  }

  getAllTransactions() {
    return Object.fromEntries(this.transactionMap);
  }

  setMap(transactionPool) {
    this.transactionMap = transactionPool;
  }

  setMapFromObject(transactionPoolObject) {
    const newMap = TransactionPool.transformObjectToMap(transactionPoolObject);
    this.setMap(newMap);
  }

  static transformObjectToMap(transactionPoolObject) {
    const comingMap = new Map();
    for (const [key, value] of Object.entries(transactionPoolObject)) {
      comingMap.set(key, value);
    }
    return comingMap;
  }
}

module.exports = TransactionPool;
