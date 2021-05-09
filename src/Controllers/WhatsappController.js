const startBot = require('../Services')
var client
startBot
.then(venom =>{ client = venom; teste(venom)})
.catch((error) => console.log(error));


function teste(client){

}

exports.sendText = (req, res, next) => {
  const {to, content} = req.body.args
  console.log(client)
  client.sendText(to, content).then((result) => {
    res.status(201).json({success: true, response: result.status})
  }).catch((erro) => {
    res.status(201).json({success: false, error: erro.text})
  });
  
};

exports.sendImage = (req, res, next) => {
  const {to, content} = req.body.args
  console.log(client)
  client.sendImage(to, content, 'a', 'a').then((result) => {
    res.status(201).json({success: true, response: result.status})
  }).catch((erro) => {
    res.status(401).json({success: false, error: erro.text})
  });
  
};