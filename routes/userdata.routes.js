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
    getHistory,
} = require('../controller/userData.controller');

/**
 * Peticion post para obtener las transacciones mediante el webId
 * URL: {{URL_SERVER}}/api/data/user/getTransaction
 * BODY: {
 *          "user":"https://dipaz.inrupt.net/profile/card#me"
 *       }
 */
app.post('/getTransaction', getPersonTransaction);
/** 
 * Petición post que obtiene el historial de un usuario y el tipo de recurso
 * Tipos de recursos: job, ecas
 * URL: {{URL_SERVER}}/api/data/user/getHistory
 * BODY: {
 *          "user":"https://dipaz.inrupt.net/profile/card#me",
 *          "resource":"ecas"
 *       }
*/
app.post('/getHistory',getHistory);


module.exports = app;