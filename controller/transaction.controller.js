const Transaction = require('../register/transaction');

const setNewTransaction = (req, res) => {
  const eca = req.body;

  if (eca.softSkills < 0 || eca.softSkills > 3) {
    return res.status(400).json({ message: 'Wrong number of Soft Skills'});
  }

  const ecaInformation = {
    studentInformation: {
      title: eca.title,
      description: eca.description,
      evidenceLink: eca.evidenceLink,
    },
    professorInformation: {
      title: eca.title,
      description: eca.description,
      evidenceLink: eca.evidenceLink,
      softSkills: eca.softSkills,
    },
  };
  const signatures = {
    studentSignature: eca.studentSignature,
    professorSignature: eca.professorSignature,
  };

  const keys = {
    studentPublicKey: eca.studentKey,
    professorPublicKey: eca.professorKey,
  };

  const isAValidTransaction = Transaction.validTransaction(
    ecaInformation,
    signatures,
    keys,
  );

  res.status(200).json({ result: isAValidTransaction });
};

module.exports = {
  setNewTransaction,
};
