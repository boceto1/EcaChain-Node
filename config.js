const { generateHash } = require('./util/crypto-hash');

const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3;
const timestamp = new Date();
const lastHash = '--------';
const data = [{ message: 'Welcome to the ECACHAIN' }];
const difficulty = INITIAL_DIFFICULTY;
const nonce = 0;

const GENESIS_DATA = {
  timestamp,
  lastHash,
  data,
  nonce,
  difficulty,
  hash: generateHash(timestamp, nonce, difficulty, lastHash, data),
};

module.exports = {
  GENESIS_DATA,
  MINE_RATE,
};
