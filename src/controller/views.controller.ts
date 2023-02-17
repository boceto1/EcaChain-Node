import { Request, Response } from 'express';
import Block from '../model/typescript/Block';
import SingletonElement from '../singleton/singleton';

const transactionPool = SingletonElement.getTransactionDataPool();

export const renderIndex = (_: Request, res: Response) => {
  Block.find({}, function(error, blocks) {
    if (error) {
      res.status(500).send(error);
      return;
    }
    return res.render('index', { title: 'DeEduNode | Blocks', blocks });
  });
};

export const renderTransactionPoolView = (_: Request, res: Response) => {
  try {
    const pendingTransactions = transactionPool.getAllTransactions();
    return res.render('pool', {
      title: 'DeEduNode | Blocks',
      pendingTransactions,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
