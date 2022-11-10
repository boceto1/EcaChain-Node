/**
 * Importacion del modelo de la coleccion de la base de datos Mongo
 */
const Block = require('../model/Block');

/**
 * Funcción para obtener todas las transacciones del usuario a partir del WebId
 * @param {*} req datos que se envia en la petición en formato json
 * "user":"https://dipaz.inrupt.net/profile/card#me"
 * @param {*} res la respuesta que se obtendra al realizar la petición
 */
const getPersonTransaction = (req, res) => {
  const { user } = req.body;
  /**
   * Función find de Mongo que encuentra todas las transacciones a partir del webId
   */
  Block.find({ 'data.data.userId': user }, function(error, block) {
    if (error) {
      res.status(500).send(error);
      return;
    }
    return res.status(200).json(block);
  });
};

/**
 * Funcción para obtener todas las transacciones del usuario realizado para un recurso especifico a partir del WebId
 * @param {*} req datos que se envia en la petición en formato json
 * "user":"https://dipaz.inrupt.net/profile/card#me",
 * "resource":"ecas"
 * @param {*} res la respuesta que se obtendra al realizar la petición
 */
const getHistory = (req, res) => {
  const { resource } = req.body;

  Block.find({ 'data.data.resourceId': resource }, (error, block) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    return res.status(200).json(block);
  });
};

/**
 * Funcción para obtener todas las transacciones del usuario por acción especifica y WebId
 * @param {*} req datos que se envia en la petición en formato json
 * "user":"https://dipaz.inrupt.net/profile/card#me",
 * "action":"add"
 * @param {*} res la respuesta que se obtendra al realizar la petición
 */
const verifyResource = (req, res) => {
  const { user, action } = req.body;
  Block.find(
    { 'data.data.userId': user, 'data.data.action': action },
    (error, block) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      return res.status(200).json(block);
    },
  );
};

/**
 * Modulos o funciones que se exportan al llamar el controlador en otro archivo
 */
module.exports = {
  getPersonTransaction,
  getHistory,
  verifyResource,
};
