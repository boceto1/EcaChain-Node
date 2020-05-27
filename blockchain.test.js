const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
  let blockchain, newChain, originalChain;

  beforeEach(() => {
    blockchain = new Blockchain();
    newChain = new Blockchain();
    originalChain = blockchain.chain;
  });

  it('contains a `chain` Array instance', () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it('starts with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block to the chain', () => {
    const newData = 'foo bar';
    blockchain.addBlock({ data: newData });

    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

  describe('isValidChain()', () => {
    describe('when the chain does not start with the genesis block', () => {
      it('return false', () => {
        blockchain.chain[0] = { data: 'fake-genesis' };
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe('when the chain starts with the genesis block and has multiple blocks', () => {
      beforeEach(() => {
        blockchain.addBlock({ data: 'ECA1-SOFTSKILL' });
        blockchain.addBlock({ data: 'ECA2-SOFTSKILL' });
        blockchain.addBlock({ data: 'ECA3-SOFTSKILL' });
      });
      describe('and a last hash reference has changend', () => {
        it('returns false', () => {
          blockchain.chain[2].lastHash = 'broken-lastHash';
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe('and the chain contains a block with an invalid field', () => {
        it('returns false', () => {
          blockchain.chain[2].data = 'NO-ECA-SOFTSKILL';
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe('and the chain does not contain any invalid blocks', () => {
        it('returns true', () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });

  describe('replaceChain()', () => {
    beforeEach(() => {
      jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());
      jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn());
    });
    describe('when the new chain is not longer', () => {
      beforeEach(() => {
        newChain.chain[0] = { new: 'chain' };
        blockchain.replaceChain(newChain.chain);
      });
      it('does not replace the chain', () => {
        expect(blockchain.chain).toEqual(originalChain);
      });

      it('logs an error', () => {
        expect(jest.spyOn(global.console, 'error')).toHaveBeenCalled();
      });
    });

    describe('when the new chain is longer', () => {
      beforeEach(() => {
        newChain.addBlock({ data: 'ECA1-SOFTSKILL' });
        newChain.addBlock({ data: 'ECA2-SOFTSKILL' });
        newChain.addBlock({ data: 'ECA3-SOFTSKILL' });
      });

      describe('and the chain is invalid', () => {
        beforeEach(() => {
          newChain.chain[2].hash = 'some-fake-hash';
          blockchain.replaceChain(newChain.chain);
        });
        it('does not replace the chain', () => {
          expect(blockchain.chain).toEqual(originalChain);
        });

        it('logs an error', () => {
          expect(jest.spyOn(global.console, 'error')).toHaveBeenCalled();
        });
      });
      describe('and the chain is valid', () => {
        beforeEach(() => {
          blockchain.replaceChain(newChain.chain);
        });
        it('replaces the chain', () => {
          expect(blockchain.chain).toEqual(newChain.chain);
        });
        it('logs about chain replacement', () => {
          expect(global.console.log).toHaveBeenCalled();
        });
      });
    });
  });
});
