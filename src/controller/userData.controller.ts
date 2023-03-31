import { Request, Response } from 'express';
/**
 * Importacion del modelo de la coleccion de la base de datos Mongo
 */
import Block from '../model/Block';

/**
 * Funcción para obtener todas las transacciones del usuario a partir del WebId
 * @param {*} req datos que se envia en la petición en formato json
 * "user":"https://dipaz.inrupt.net/profile/card#me"
 * @param {*} res la respuesta que se obtendra al realizar la petición
 */
export const getPersonTransaction = (req: Request, res: Response) => {
  const { userId } = req.query;

  /**
   * Función find de Mongo que encuentra todas las transacciones a partir del webId
   */
  Block.find({ 'data.data.userId': userId }, function(error, block) {
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
export const getHistory = (req: Request, res: Response) => {
  const { resourceId } = req.query;

  Block.find({ 'data.data.resourceId': resourceId }, (error, block) => {
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
export const verifyResource = (req: Request, res: Response) => {
  const { user, action } = req.body;
  Block.find(
    { 'data.data.userId': user, 'data.action': action },
    (error, block) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      return res.status(200).json(block);
    },
  );
};
