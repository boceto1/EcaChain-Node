/**
 * Llamado de la libreria express utilizado para usar dentro de las peticiones HTTP
 */
const express = require('express');
const app = express();

/**
 * Implementacion de bodyParser que permite el uso de application/json en el body de las peticiones
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());

/**
 * Rutas de acceso para endpoints de generacion de bloques, transacciones y datos de la blockchain
 */
app.use('/blocks', require('./block.routes'));
app.use('/transactions', require('./transaction.routes'));
app.use('/pool', require('./transactionPool.routes'));
app.use('/data/transactions', require('./transactions.routes'));

/**
 * Ruta de acceso para los endpoints de usuarios obtenidos desde la base de datos
 */
app.use('/data/user', require('./userdata.routes'));

module.exports = app;
