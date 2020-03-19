const { generateHash } = require('./crypto-hash');

const isAValidLastHash = chain => {
  for (let i = 1; i < chain.length; i++) {
    const block = chain[i];
    const actualLastHash = chain[i - 1].hash;
    const { lastHash, timestamp, hash, data } = block;

    if (lastHash !== actualLastHash) return false;

    const validatedHash = generateHash(timestamp, lastHash, data);

    if (hash !== validatedHash) return false;
  }

  return true;
};

module.exports = {
  isAValidLastHash,
};
