const startBot = require('../Services')

exports.post = (req, res, next) => {
  const {to, content} = req.body.args
  startBot.then(venom => start(venom))
  async function start(client){
    client.sendText(to, content).then((result) => {
      res.status(201).json({success: true, response: result.status})
    }).catch((erro) => {
      res.status(401).json({success: false, error: erro.text})
    });
  }
};
