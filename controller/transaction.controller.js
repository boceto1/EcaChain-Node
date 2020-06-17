const Transaction = require('../register/transaction');
const SigletonElements = require('../singleton/singleton');
const transactionPool = SigletonElements.getTransactionPool();
const pubSub = SigletonElements.getPubSub();
const blockchain = SigletonElements.getBlockchain();

const setNewTransaction = (req, res) => {
  const eca = req.body;

  if (eca.softSkills < 0 || eca.softSkills > 3) {
    return res.status(400).json({ message: 'Wrong number of Soft Skills' });
  }

  const transaction = new Transaction(eca);
  transactionPool.setTransaction(transaction);
  pubSub.broadcastTransaction(transaction);
  res.redirect('/api/pool');
};

const mineTransaction = (req, res) => {
  const id = req.params.id;
  const transaction = transactionPool.getTransaction(id);

  if (!transaction)
    return res.status(404).json({ message: "There isn't transaction" });

  transactionPool.clearTransaction(id);
  blockchain.addBlock({ data: transaction });

  res.redirect('/api/blocks');
};

module.exports = {
  setNewTransaction,
  mineTransaction,
};
