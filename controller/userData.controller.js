const Block = require('../model/Block');

const getPersonTransaction = (req, res) => {
    console.log("OK esta bien esto saldra :)")
    const {user} = req.body;
    console.log(user);
    Block.find({"data.data.userId":user},function(error,block){
    //Block.find({hash:'04cd3dafc1710a10e449796bd4ec310f647b0fab8ed389e8152052c4ff09af06'},function(error,block){
        if (error){
            response.status(500).send(error);
            return;
        }
        //console.log(block);
        for (var index in block){
            console.log(block[index].data);
        }
        return res.json(block);
    });

}

module.exports = {
  getPersonTransaction,
}