const Transaction = require('../register/transaction');
const SigletonElements = require('../singleton/singleton');
const transactionPool = SigletonElements.getTransactionPool();
const pubSub = SigletonElements.getPubSub();

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

module.exports = {
  setNewTransaction,
};
