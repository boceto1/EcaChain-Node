const Block = require('./block');
const DbBlock = require('../model/Block').default;
import { isValidEachBlock } from './util';
const { differenceBy } = require('lodash');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  async addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });
    await this._saveBlockinDb(newBlock);
    this.chain.push(newBlock);
  }

  replaceChain(chain) {
    if (chain.length < this.chain.length) {
      // eslint-disable-next-line no-undef
      console.error('The incoming chain must be longer');
      return;
    }

    if (!Blockchain.isValidChain(chain)) {
      // eslint-disable-next-line no-undef
      console.log('The incoming chain must be valid');
      return;
    }

    // eslint-disable-next-line no-undef
    console.log('replacing chain with', chain);
    this.replaceDBChain(chain);
    this.chain = chain;
  }

  async _saveBlockinDb(block) {
    const dbBlock = new DbBlock({ ...block });
    dbBlock.save();
  }

  static isValidChain(chain) {
    delete chain[0]._id;
    delete chain[0].__v;

    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    if (!isValidEachBlock(chain)) return false;

    return true;
  }

  replaceDBChain(chain) {
    DbBlock.find({}, (err, dbBlocs) => {
      const formatedBlocks = dbBlocs.map(block => ({
        timestamp: block.timestamp,
        lastHash: block.lastHash,
        hash: block.hash,
        data: block.data,
        nonce: block.nonce,
        difficulty: block.difficulty,
      }));
      const newBlocks = differenceBy(chain, formatedBlocks, 'hash');
      DbBlock.remove();
      DbBlock.create(newBlocks);
    });
  }
}

module.exports = Blockchain;
