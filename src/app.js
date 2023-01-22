const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

/* Middlewares */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Setting the view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

/* Config routes */
app.use('/api', require('./routes/index'));
app.use('', require('./routes/views.routes'));

module.exports = app;
