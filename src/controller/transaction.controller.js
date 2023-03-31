import Transaction from '../register/transaction';
import SigletonElements from '../singleton/singleton';
const transactionPool = SigletonElements.getTransactionPool();
const pubSub = SigletonElements.getPubSub();
const blockchain = SigletonElements.getBlockchain();

const setNewTransaction = (req, res) => {
  const eca = req.body;

  if (eca.softSkills < 0 || eca.softSkills > 3) {
    return res.status(400).json({ message: 'Wrong number of Soft Skills' });
  }

  const transaction = new Transaction(eca);
  transactionPool.setTransaction(transaction);
  pubSub.broadcastTransaction();
  res.redirect('/api/pool');
};

const mineTransaction = (req, res) => {
  const id = req.params.id;
  const transaction = transactionPool.getTransaction(id);

  if (!transaction)
    return res.status(404).json({ message: "There isn't transaction" });

  transaction;
  const isAvalidTransaction = Transaction.validTransaction(
    transaction.ecaInformation,
    transaction.signatures,
    transaction.keys,
  );

  if (!isAvalidTransaction) {
    return res.status(400).json({ message: 'The transaction is not valid' });
  }

  transactionPool.clearTransaction(id);
  blockchain.addBlock({ data: transaction }).then(() => {
    pubSub.broadcastChain();
    pubSub.broadcastTransaction();
    res.redirect('/api/blocks');
  });
};

const getTransactionBalance = (req, res) => {
  const key = req.body.key;

  if (!key) {
    return res.status(400).json({ message: "There isn't a key" });
  }

  const chain = blockchain.chain;

  const studentBlocks = chain.filter(block =>
    block.data.output ? block.data.output.address === key : false,
  );

  const softSkills = studentBlocks.reduce((softSkills, currentBlock) => {
    const blockSoftSkills = currentBlock.data.output.softSkills;
    const newSoftSkillsValues = softSkills;

    blockSoftSkills.forEach(softSkill => {
      if (newSoftSkillsValues[softSkill]) {
        newSoftSkillsValues[softSkill] += 1;
      } else {
        newSoftSkillsValues[softSkill] = 1;
      }
    });
    return newSoftSkillsValues;
  }, {});

  return res.json({
    ecas: studentBlocks.length,
    softSkills,
  });
};

const getMyTransactions = (req, res) => {
  const key = req.body.key;

  if (!key) {
    return res.status(400).json({ message: "There isn't a key" });
  }

  const chain = blockchain.chain;

  const studentBlocks = chain.filter(block =>
    block.data.output ? block.data.output.address === key : false,
  );

  if (studentBlocks.length === 0) {
    return res.status(404).json({ ecas: [] });
  }

  const studentEcas = studentBlocks.map(block => block.data);

  return res.json({ ecas: studentEcas });
};

module.exports = {
  setNewTransaction,
  mineTransaction,
  getTransactionBalance,
  getMyTransactions,
};
