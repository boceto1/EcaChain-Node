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
    const {user} = req.body;
    /**
     * Función find de Mongo que encuentra todas las transacciones a partir del webId
     */
    Block.find({"data.data.userId":user},function(error,block){
        if (error){
            response.status(500).send(error);
            return;
        }
        return res.json(block);
    });
}

/**
 * Funcción para obtener todas las transacciones del usuario realizado para un recurso especifico a partir del WebId
 * @param {*} req datos que se envia en la petición en formato json 
 * "user":"https://dipaz.inrupt.net/profile/card#me",
 * "resource":"ecas"
 * @param {*} res la respuesta que se obtendra al realizar la petición
 */
const getHistory = (req,res) => {
    const { user,resource }=req.body;
    Block.find({"data.data.userId": user,"data.data.resourceId": {$regex:resource}}, (error,block)=>{
        if(error){
            res.status(500).send(error);
        }
        return res.json(block);
    });
}


/**
 * Modulos o funciones que se exportan al llamar el controlador en otro archivo
 */
module.exports = {
  getPersonTransaction,
  getHistory,
}
