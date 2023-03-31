import { getTransactionPool as _getTransactionPool } from '../singleton/singleton';
const transactionPool = _getTransactionPool();

const getTransactionPool = (req, res) => {
  res.json({ transactionPool });
};

export default {
  getTransactionPool,
};
