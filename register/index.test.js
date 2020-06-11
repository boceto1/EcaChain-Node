const Register = require('./index');

describe('Register', () => {
  let register = null;

  beforeEach(() => {
    register = new Register();
  });

  it('has a `publicKey`', () => {
    expect(register).toHaveProperty('publicKey');
  });
});
