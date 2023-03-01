import { Schema, model } from 'mongoose';

interface IBlock {
    timestamp: number,
    lastHash: string,
    hash: string,
    data: object,
    nonce: number,
    difficulty: number
}

const BlockSchema = new Schema<IBlock> ({
  timestamp: { type: Number, required: true },
  lastHash: { type: String, required: true },
  hash: { type: String, required: true },
  data: { type: Object, required: true },
  nonce: { type: Number, required: true },
  difficulty: { type: Number, required: true },
});

export = model<IBlock>('Block', BlockSchema);
