import express from 'express';
import {
  setNewTransaction,
  mineTransaction,
  getTransactionPool,
  getTransactionDataById,
} from '../controller/transactionData.controller';

const app = express();

app.post('', setNewTransaction);

app.post('/:id', mineTransaction);

app.get('', getTransactionPool);

app.get('/:id', getTransactionDataById);

export default app;
