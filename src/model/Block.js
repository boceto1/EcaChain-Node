import { Schema, model } from 'mongoose';

const BlockSchema = new Schema({
  timestamp: { type: Number, required: true },
  lastHash: { type: String, required: true },
  hash: { type: String, required: true },
  data: { type: Object, required: true },
  nonce: { type: Number, required: true },
  difficulty: { type: Number, required: true },
});

export default model('Block', BlockSchema);
