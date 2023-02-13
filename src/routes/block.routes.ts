import express from 'express';
import {
  getBlocks,
  getBlockById,
  mineBlocks,
} from '../controller/block.controller';

const app = express();

app.get('', getBlocks);

app.post('/mine', mineBlocks);

app.get('/:id', getBlockById);

module.exports = app;
