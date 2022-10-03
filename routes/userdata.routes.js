const express = require('express');
const app = express();

const {
getPersonTransaction,
} = require('../controller/userData.controller');


app.post('', getPersonTransaction);

module.exports = app;