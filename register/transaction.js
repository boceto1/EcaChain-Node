const uuid = require('uuid');
const { verifyDocumentSignature } = require('../util');

class Transaction {
  constructor({ owner, eca }) {
    this.id = uuid();
    this.input = this.createInput();
    this.output = this.createOutput();
  }

  // createInput(owner, eca) {
  //   const { studentSignature, professorSignature, }
  //   return {
  //     owner,
  //     eca,
  //   }
  // }

  // createOutput() {
  //   console.log('Create Output');
  // }

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

    console.log("Student Verification", resultVerifyStudent);
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
