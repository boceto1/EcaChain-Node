import { Request, Response } from 'express';
import Block from '../model/Block';
import SigletonElements from '../singleton/singleton';

const blockchain = SigletonElements.getBlockchain();
const pubsub = SigletonElements.getPubSub();

export const getBlocks = async (_: Request, res: Response) => {
  try {
    const blocks = await Block.find();
    return res.status(200).json(blocks);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getBlockById = async (req: Request, res: Response) => {
  try {
    const blockId = req.params.id;
    const block = await Block.findById(blockId);
    return res.status(200).json(block);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const mineBlocks = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    await blockchain.addBlock({ data });
    pubsub.broadcastChain();
    res.redirect('/api/blocks');
  } catch (error) {
    res.status(400).json({ error });
  }
};
