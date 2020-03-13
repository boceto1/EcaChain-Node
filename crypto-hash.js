const cryptoJS = require('crypto-js');

const cryptoHash = (...inputs) =>
  cryptoJS.SHA256(inputs.sort().join('')).toString();

module.exports = cryptoHash;
