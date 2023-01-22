const { v4: uuidV4 } = require('uuid');

class Transaction {
  constructor(data) {
    this.id = uuidV4();
    this.data = data;
  }
}

module.exports = Transaction;
