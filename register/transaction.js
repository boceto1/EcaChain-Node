const uuid = require('uuid');
const { verifySignature } = require('../util');

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

  // static validTransaction(ecaInformation, signatures, keys) {
  //   //Verify Student
  //   const studentSignature = signatures.studentSignature;
  //   const studentInformation = ecaInformation.studentInformation;
  //   const studentPublicKey = keys.studentPublicKey;
  //   const resultVerifyStudent = verifyDocumentSignature(
  //     studentInformation,
  //     professorSignature,
  //     studentPublicKey,
  //   );

  //   //Verify Professor
  //   const professorSignature = signatures.professorSignature;
  //   const professorInformation = signatures.professorInformation;
  //   const professorPublicKey = keys.professorPublicKey;
  //   const resultVerifyProfessor = verifySignature(
  //     professorInformation,
  //     professorSignature,
  //     professorPublicKey,
  //   );

  //   return resultVerifyStudent === resultVerifyProfessor;
  // }
}
