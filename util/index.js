const NodeRSA = require('node-rsa');

const SOURCE_FORMAT = undefined;
const SIGNATURE_FORMAT = 'base64';

const generateKeys = () => new NodeRSA({ b: 2048 });

const exportKey = (key, keyType) => key.exportKey(keyType);

const importKey = (keyData, keyType) => new NodeRSA(keyData, keyType);

const signDocument = (data, privateKey) => {
  const key = importKey(privateKey, 'private');
  return key.sign(data, SIGNATURE_FORMAT);
};

const verifyDocumentSignature = (data, signature, publickey) => {
  try {
    const key = importKey(publickey, 'public');
    return key.verify(data, signature, SOURCE_FORMAT, SIGNATURE_FORMAT);
  } catch (error) {
    return `Error to verify Document: ${error}`;
  }
};

module.exports = {
  generateKeys,
  exportKey,
  importKey,
  signDocument,
  verifyDocumentSignature,
};
