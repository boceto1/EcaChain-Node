const { GENESIS_DATA } = require('./config');
const { generateHash } = require('./crypto-hash');

class Block {
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis() {
    return new Block(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;

    const hash = generateHash(timestamp, lastHash, data);
    return new Block({
      timestamp,
      lastHash,
      data,
      hash,
    });
  }
}

module.exports = Block;
