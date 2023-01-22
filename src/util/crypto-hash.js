const cryptoJS = require('crypto-js');

const generateHash = (...inputs) =>
  cryptoJS.SHA256(inputs.sort().join('')).toString();

const validateHash = (data, toValidateHash) =>
  generateHash(...data) === toValidateHash;

module.exports = {
  generateHash,
  validateHash,
};
