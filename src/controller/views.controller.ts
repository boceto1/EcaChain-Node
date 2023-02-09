const Block = require('../model/Block');
const SingletonElement = require('../singleton/singleton');
const transactionPool = SingletonElement.getTransactionDataPool();


export const renderIndex = (_, res) => {
  Block.find({}, function(error, blocks) {
    if (error) {
      res.status(500).send(error);
      return;
    }
    return res.render('index', { title: 'DeEduNode | Blocks', blocks });
  });
}

export const renderTransactionPoolView = (_, res) => {
  try {
    const pendingTransactions = transactionPool.getAllTransactions();
    return res.render('pool', { title: 'DeEduNode | Blocks', pendingTransactions });
  } catch (error) {
    return res.status(400).json(error) 
  }
}
