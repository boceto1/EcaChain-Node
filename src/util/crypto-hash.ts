import { SHA256 } from 'crypto-js';

export const generateHash = (...inputs: any[]) =>
  SHA256(inputs.sort().join('')).toString();

export const validateHash = (data: any, toValidateHash: any) => {
  return generateHash(...data) === toValidateHash;
};
