/**
 * Rutas que llaman al controlador de los usuarios para mostrar la información
 * Librerias utilizadas para llamar a peticiones HTTP
 */
const express = require('express');
const app = express();

/**
 * Metodos importados desdel el controlador userData
 */
const {
    getPersonTransaction,
} = require('../controller/userData.controller');

/**
 * Peticion post para obtener las transacciones mediante el webId
 * URL: {{URL_SERVER}}/api/data/user/getTransaction
 * BODY: {
 *          "user":"https://dipaz.inrupt.net/profile/card#me"
 *       }
 */
app.post('/getTransaction', getPersonTransaction);

module.exports = app;