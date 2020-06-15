const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/* Middlewares */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Config routes */
app.use('/api', require('./routes/index'));

module.exports = app;
