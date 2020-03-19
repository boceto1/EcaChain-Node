const { generateHash } = require('./crypto-hash');

const timestamp = new Date();
const lastHash = '--------';
const data = [{ message: 'Welcome to the ECACHAIN' }];

const GENESIS_DATA = {
  timestamp,
  lastHash,
  data,
  hash: generateHash(timestamp, lastHash, data),
};

module.exports = {
  GENESIS_DATA,
};
