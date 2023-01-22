const Transaction = require('../transactions/Transaction');
const SingletonElement = require('../singleton/singleton');
const transactionPool = SingletonElement.getTransactionDataPool();
const blockchain = SingletonElement.getBlockchain();
const pubSub = SingletonElement.getPubSub();

const setNewTransaction = (req, res) => {
  const data = req.body;
  const transaction = new Transaction(data);
  transactionPool.setTransaction(transaction.id, transaction.data);
  pubSub.broadcastTransactionData();
  res.redirect('/api/data/transactions');
};

const mineTransaction = async (req, res) => {
  const id = req.params.id;
  const transaction = transactionPool.getTransaction(id);

  if (!transaction) {
    return res.status(404).json({ message: "There isn't transaction" });
  }

  await blockchain.addBlock({ data: transaction });
  transactionPool.clearTransaction(id);
  pubSub.broadcastChain();
  pubSub.broadcastTransactionData();
  res.redirect('/api/blocks');
};

const getTransactionPool = (req, res) => {
  const transactions = transactionPool.getAllTransactions();
  res.status(200).json(transactions);
};

module.exports = {
  setNewTransaction,
  mineTransaction,
  getTransactionPool,
};
