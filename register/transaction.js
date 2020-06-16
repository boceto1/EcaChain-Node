const { v4: uuidV4 } = require('uuid');
const { verifyDocumentSignature } = require('../util');

class Transaction {
  constructor(eca) {
    this.id = uuidV4();
    this.ecaInformation = {
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
    this.signatures = {
      studentSignature: eca.studentSignature,
      professorSignature: eca.professorSignature,
    };
    this.keys = {
      studentPublicKey: eca.studentKey,
      professorPublicKey: eca.professorKey,
    };
    this.output = eca.softSkills;
  }

  static validTransaction(ecaInformation, signatures, keys) {
    //Verify Student
    const studentSignature = signatures.studentSignature;
    const studentInformation = ecaInformation.studentInformation;
    const studentPublicKey = keys.studentPublicKey;
    const resultVerifyStudent = verifyDocumentSignature(
      studentInformation,
      studentSignature,
      studentPublicKey,
    );

    //Verify Professor
    const professorSignature = signatures.professorSignature;
    const professorInformation = ecaInformation.professorInformation;
    const professorPublicKey = keys.professorPublicKey;
    const resultVerifyProfessor = verifyDocumentSignature(
      professorInformation,
      professorSignature,
      professorPublicKey,
    );
    return resultVerifyStudent === true && resultVerifyProfessor === true;
  }
}

module.exports = Transaction;
