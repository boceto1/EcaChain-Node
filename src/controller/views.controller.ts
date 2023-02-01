const Block = require('../model/Block');

export const renderIndex = (_, res) => {
  Block.find({}, function(error, blocks) {
    if (error) {
      res.status(500).send(error);
      return;
    }
    return res.render('index', { title: 'DeEduNode | Blocks', blocks });
  });
}
