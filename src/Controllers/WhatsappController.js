const startBot = require('../Services')
var client
startBot.then(venom =>{ client = venom; teste(venom)})


function teste(client){
client.onMessage(async message => {
  await client.sendText(message.from, 
`Obrigado pela Mensagem ! 😌
Mas sou somente um BOT feito para automação.👷🏽
Caso Queira, automatizar seu negocio entre em contato com meu criador. 🙋🏽‍♂️.
pelo nosso Email de contato ✉️: contato@autopyweb.com
ou por telefone 📞: (12)3600-5005

------------------------------------------------------------------
Nossos Parceiros.
🍕 - D'napolli Pizzaria e Lanchonete. (12)38967100
`);
});
}

exports.sendText = (req, res, next) => {
  const {to, content} = req.body.args
  console.log(client)
  client.sendText(to, content).then((result) => {
    res.status(201).json({success: true, response: result.status})
  }).catch((erro) => {
    res.status(401).json({success: false, error: erro.text})
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