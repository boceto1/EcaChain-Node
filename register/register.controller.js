const Transaction = require('../register/transaction');

const transactionController = (req, res) => {
  const transaction = req.body;

  const {
    studentSignature,
    professorSignature,
    ...restInformation
  } = transaction;

  const ecaInformation = {
    studentInformation: {},
    professorInformation: {},
  };

  const signatures = {
    studentSignature: '',
    professorSignature: '',
  };

  const keys = {
    studentPublicKey: '',
    professorPublicKey: '',
  };

  const resultValidation = Transaction.validTransaction(
    ecaInformation,
    signatures,
    keys,
  );

  console.log(resultValidation);
  res.status(200).json(restInformation);
};

module.exports = {
  transactionController,
};
