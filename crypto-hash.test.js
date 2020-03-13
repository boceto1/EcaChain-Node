const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {
  it('generates a SHA-256 hashed output', () => {
    expect(cryptoHash('ECACHAIN')).toEqual(
      '30dd055c03f0d63f1b53df3c6717431b8b0eb7a13afb6d5caa5212aa325a13ab',
    );
  });

  it('produce the same hash with the same input arguments in any order', () => {
    expect(cryptoHash('one', 'two', 'three')).toEqual(
      cryptoHash('three', 'one', 'two'),
    );
  });
});
