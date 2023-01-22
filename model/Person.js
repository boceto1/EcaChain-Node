const { Schema, model } = require('mongoose');

const PersonSchema = new Schema ({
    userId: { type: String, require: true },
    firstName: { type: String, require: false},
    lastName: {type: String, require: false},
});

module.exports = model('Person', PersonSchema);