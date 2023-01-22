/* eslint-disable no-undef */
const redis = require('redis');

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION',
  TRANSACTION_DATA: 'TRANSACTION_DATA',
};

const redisCredentials = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
};

class PubSub {
  constructor() {
    this.blockchain;
    this.transactionPool;
    this.transactionDataPool;

    this.publisher = redis.createClient(redisCredentials);

    this.subscriber = redis.createClient(redisCredentials);

    this.subscribeToChannels();

    this.subscriber.on('message', (channel, message) =>
      this.handleMessage(channel, message),
    );
  }

  setBlockchain(blockchain) {
    this.blockchain = blockchain;
  }

  setTransactionPool(transactionPool) {
    this.transactionPool = transactionPool;
  }

  setTransactionDataPool(transactionDataPool) {
    this.transactionDataPool = transactionDataPool;
  }

  handleMessage(channel, message) {
    // eslint-disable-next-line no-undef
    console.log(`Message received. Channel: ${channel}. Message: ${message}.`);

    const parsedMessage = JSON.parse(message);

    switch (channel) {
      case CHANNELS.BLOCKCHAIN:
        this.blockchain.replaceChain(parsedMessage);
        break;
      case CHANNELS.TRANSACTION:
        this.transactionPool.setMap(parsedMessage);
        break;
      case CHANNELS.TRANSACTION_DATA:
        this.transactionDataPool.setMapFromObject(parsedMessage);
        break;
    }
  }

  subscribeToChannels() {
    Object.values(CHANNELS).forEach(channel => {
      this.subscriber.subscribe(channel);
    });
  }

  publish({ channel, message }) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  broadcastTransaction() {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(this.transactionPool),
    });
  }

  broadcastTransactionData() {
    this.publish({
      channel: CHANNELS.TRANSACTION_DATA,
      message: JSON.stringify(this.transactionDataPool.getAllTransactions()),
    });
  }
}

module.exports = PubSub;
