const { GENESIS_DATA, MINE_RATE } = require('./config');
const { generateHash } = require('./crypto-hash');

class Block {
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {
    return new Block(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    const lastHash = lastBlock.hash;
    const { difficulty, hash, nonce, timestamp } = this.getInfoHash(
      lastBlock,
      data,
    );
    return new Block({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash,
    });
  }

  static getInfoHash(lastBlock, data) {
    const lasthash = lastBlock.hash;
    let nonce, timestamp, hash, difficulty;
    nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = this.adjustDifficulty({
        originalBlock: lastBlock,
        timestamp,
      });
      hash = generateHash(timestamp, lasthash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return {
      difficulty,
      hash,
      nonce,
      timestamp,
    };
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;

    if (difficulty < 1) return 1;

    const difference = timestamp - originalBlock.timestamp;

    if (difference > MINE_RATE) return difficulty - 1;

    return difficulty + 1;
  }
}

module.exports = Block;
