import { Schema, model } from 'mongoose';

interface IPerson {
    userId: string,
    firstName?: string,
    lastName?: string
}

const PersonSchema = new Schema<IPerson> ({
    userId: { type: String, require: true },
    firstName: { type: String, require: false},
    lastName: {type: String, require: false},
});

export = model('Person', PersonSchema);