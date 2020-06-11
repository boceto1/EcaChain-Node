const Register = require('./index');
const Transaction = require('./transaction');
const { generateKeys, exportKey, signDocument } = require('../util');
describe('Transaction', () => {
  let studentRegister, eca;

  beforeEach(() => {
    const studenKeys = generateKeys();
    const professorKeys = generateKeys();

    const ecaExample = {
      title: 'Creacion de App para el Cicte',
      description:
        'Se hizo algún una aplicación en el CICTE que usa React y otras elementos',
      evidenceLink: 'evindeceLink',
      softSkills: [
        'Aprendizaje Continuo',
        'Habilidades de escritura',
        'Honestidad',
      ],
      studentAddress: exportKey(studenKeys, 'public'),
      professorAddress: exportKey(professorKeys, 'public'),
      studentSignature: null,
      professorSignature: null,
    };

    const studentSignature = signDocument(
      JSON.stringify({
        title: ecaExample.title,
        description: ecaExample.description,
        studentAddress: ecaExample.studentAddress,
        evidenceLink: ecaExample.evidenceLink,
      }),
      exportKey(studenKeys, 'private'),
    );

    const professorSignature = signDocument(
      JSON.stringify({
        title: ecaExample.title,
        description: ecaExample.description,
        studentAddress: ecaExample.studentAddress,
        evidenceLink: ecaExample.evidenceLink,
        softSkills: ecaExample.softSkills,
      }),
      exportKey(professorKeys, 'private'),
    );

    ecaExample.studentSignature = studentSignature;
    ecaExample.professorSignature = professorSignature;

    studentRegister = new Register();
    studentRegister = exportKey(studenKeys, 'public');
    eca = ecaExample;
  });

  it('has an id', () => {
    // It has a defined Id
  });
  it('has an input', () => {
    // It has a title, description and softSkills and signatures.
  });
  it('has an output', () => {
    //It has the sum of softSkill (current of register and added softSkills)
  });

  describe('validTransaction ()', () => {
    describe('when the transaction is valid', () => {
      it('returns true', () => {
        const transaction = new Transaction({ studentRegister, eca });
        expect(Transaction.validTransaction(transaction)).toBe(true);
      });
    });

    describe('when the transaction is invalid', () => {
      describe('and the Eca Student Address is different from Register Student Address', () => {
        const transaction = new Transaction({ studentRegister: 'foo', eca });
        expect(Transaction.validTransaction(transaction)).toBe(false);
      });
      describe('and the student signature is not valid', () => {
        eca.studentSignature = 'foo';
        const transaction = new Transaction({ studentRegister, eca });
        expect(Transaction.validTransaction(transaction)).toBe(false);
      });
      describe('and the professor signture is not valid', () => {
        eca.professorSignature = 'foo';
        const transaction = new Transaction({ studentRegister: 'foo', eca });
        expect(Transaction.validTransaction(transaction)).toBe(false);
      });
      describe('and has more 3 soft skills', () => {
        eca.softSkills.push('foo-soft-skill');
        const transaction = new Transaction({ studentRegister: 'foo', eca });
        expect(Transaction.validTransaction(transaction)).toBe(false);
      });
    });
  });
});
