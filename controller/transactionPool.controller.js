const SigletonElements = require('../singleton/singleton');
const transactionPool = SigletonElements.getTransactionPool();

const getTransactionPool = (req, res) => {
  res.json({ transactionPool });
};

module.exports = {
  getTransactionPool,
};
