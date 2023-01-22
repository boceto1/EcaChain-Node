const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, '../views'));

app.get('/', function(req, res) {
  res.render('index', { layout: false });
});

module.exports = app;
