import { Request, Response } from 'express';
import Transaction from '../transactions/Transaction';
import SingletonElement from '../singleton/singleton';

const transactionPool = SingletonElement.getTransactionDataPool();
const blockchain = SingletonElement.getBlockchain();
const pubSub = SingletonElement.getPubSub();

export const setNewTransaction = (req: Request, res: Response) => {
  const data = req.body;
  const transaction = new Transaction(data);
  transactionPool.setTransaction(transaction.id, transaction.data);
  pubSub.broadcastTransactionData();
  res.redirect('/api/data/transactions');
};

export const mineTransaction = async (req: Request, res: Response) => {
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

export const getTransactionPool = (_: Request, res: Response) => {
  const transactions = transactionPool.getAllTransactions();
  res.status(200).json(transactions);
};

export const getTransactionDataById = (req: Request, res: Response) => {
  const transactionId = req.params.id;
  const transaction = transactionPool.getTransaction(transactionId);

  if (transaction) {
    res.status(200).json(transaction);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
};
