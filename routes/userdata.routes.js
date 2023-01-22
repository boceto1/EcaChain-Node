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
  verifyResource,
} = require('../controller/userData.controller');

/**
 * Peticion post para obtener las transacciones mediante el webId
 * URL: {{URL_SERVER}}/api/data/user/getTransaction
 * BODY: {
 *          "user":"https://dipaz.inrupt.net/profile/card#me"
 *       }
 */
app.get('/getTransaction', getPersonTransaction);
/**
 * Petición post que obtiene el historial de un usuario y el tipo de recurso
 * Tipos de recursos: job, ecas
 * URL: {{URL_SERVER}}/api/data/user/getHistory
 * BODY: {
 *          "user":"https://dipaz.inrupt.net/profile/card#me",
 *          "resource":"ecas"
 *       }
 */
app.get('/getHistory', getHistory);
/**
 * Petición post que obtiene el historial de una accion segun el usuario
 * Tipos de acciones: add, delete, update
 * URL: {{URL_SERVER}}/api/data/user/verifyResource
 * BODY: {
 *          "user":"https://dipaz.inrupt.net/profile/card#me",
 *          "action":"add"
 *       }
 */
app.get('/verifyResource', verifyResource);

module.exports = app;
