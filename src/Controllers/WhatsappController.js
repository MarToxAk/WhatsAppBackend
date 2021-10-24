const startBot = require('../Services')

const { MongoClient, ObjectID } = require('mongodb')

// Create cached connection variable

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
async function connectToDatabase(uri) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  await client.connect()
  const database = client.db('semana09')
  return database
}

var client
startBot
  .venom()
  .then((venom) => {
    client = venom
    teste(venom)
  })
  .catch((error) => console.log())

function teste(client) {}

exports.sendText = (req, res, next) => {
  const { to, content } = req.body.args
  client
    .sendText(to, content)
    .then((result) => {
      res.status(201).json({ success: true, response: result.status })
    })
    .catch((erro) => {
      res.status(201).json({ success: false, error: erro.text })
    })
}

exports.sendPub = async (req, res, next) => {
  const db = await connectToDatabase(process.env.MONGODB_URI)
  const collection = await db.collection('users')
  const users = await collection.find({}).toArray()
  const success = 0
  const error = 0

  for (const user in users) {
    await client
      .sendImage(
        `55${user.telephone.replace(/[^0-9]/g, '')}@c.us`,
        'https://i.ibb.co/j65yLrn/47.png',
        'Propaganda',
        `Boa Noite ${user.name}, Peça já seu Lanche Delicioso pelo nosso Aplicativo https://dnapolli.delivery/`
      )
      .then(() => {})
      .catch(() => {})
    await client
      .sendText(
        `55${user.telephone.replace(/[^0-9]/g, '')}@c.us`,
        `Se caso preferir Sr.ª  ${user.name}, Peça pelo nosso WhatsApp rapido e facil https://wa.me/551238967100`
      )
      .then(() => {})
      .catch(() => {})
    await client
      .sendContactVcard(
        `55${user.telephone.replace(/[^0-9]/g, '')}@c.us`,
        '551238967100@c.us'
      )
      .then(() => {
        success = +1
      })
      .catch(() => {
        error = +1
      })
  }

  res.status(201).json({ success, error })
}

exports.sendImage = (req, res, next) => {
  const { to, content } = req.body.args
  console.log(client)
  client
    .sendImage(to, content, 'a', 'a')
    .then((result) => {
      res.status(201).json({ success: true, response: result.status })
    })
    .catch((erro) => {
      res.status(401).json({ success: false, error: erro.text })
    })
}

exports.sendQrcode = async (req, res, next) => {
  res.send(`<img src='${await startBot.imgstr()}'></img>`)
}

exports.client = async (req, res, next) => {
  const sesion = await client.getSessionTokenBrowser(true)
  res.send(sesion)
}
