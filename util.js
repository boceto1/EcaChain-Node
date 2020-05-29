const { validateHash } = require('./crypto-hash');

const isValidEachBlock = chain => {
  for (let indexBlock = 1; indexBlock < chain.length; indexBlock++) {
    if (
      !isValidItsLasthHash(chain, indexBlock) ||
      !isAValidItsHash(chain, indexBlock) ||
      isNoJumpedDifficulty(chain, indexBlock)
    )
      return false;
  }
  return true;
};

const isValidItsLasthHash = (chain, indexBlock) =>
  chain[indexBlock].lastHash === chain[indexBlock - 1].hash;

const isNoJumpedDifficulty = (chain, indexBlock) => {
  return chain[indexBlock - 1].difficulty - chain[indexBlock].difficulty > 1;
};

const isAValidItsHash = (chain, indexBlock) => {
  const { hash, ...blockData } = chain[indexBlock];
  return validateHash(Object.values(blockData), hash);
};

module.exports = {
  isValidEachBlock,
};
