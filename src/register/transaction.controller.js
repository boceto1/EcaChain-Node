const TransactionPool = require('./transaction-pool');

const transactionPool = new TransactionPool();

const setTransaction = (req, res) => {
  const eca = req.body;
  transactionPool.setTransaction(eca);
  res.json(eca);
};

module.exports = {
  setTransaction,
};
