const { Schema, model } = require('mongoose');

const BlockSchema = new Schema({
  timestamp: { type: Number, required: true },
  lastHash: { type: String, required: true },
  hash: { type: String, required: true },
  data: { type: Object, required: true },
  nonce: { type: Number, required: true },
  difficulty: { type: Number, required: true },
});

module.exports = model('Block', BlockSchema);
