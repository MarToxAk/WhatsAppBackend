const request = require('request')

exports.post = (req, res, next) => {
  await request(
    {
      method: 'POST',
      url: 'https://api.nvoip.com.br/v2/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic TnZvaXBBcGlWMjpUblp2YVhCQmNHbFdNakl3TWpFPQ=='
      },
      body: 'username=38389001&password=j6cT--2fF4IaYGS09-g2L@VXQYlXQ--5A-2IgFj&grant_type=password'
    },
    async function (response, body) {
      console.log('Status:', response.statusCode)
      console.log('Headers:', JSON.stringify(response.headers))
      console.log('Response:', body)
      const token = JSON.parse(body)
      await request(
        {
          method: 'POST',
          url: 'https://api.nvoip.com.br/v2/torpedo/voice',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.access_token
          },
          body: '{  "caller": "38389001",  "called": "1238965363",  "audios": [    {      "audio": "Olá, você tem um novo pedido no aplicativo",      "positionAudio": 1    }  ],  "dtmfs": [    {      "audio": "para aceita o pedido, digite 1, se não, digite 2",      "positionAudio": 2,      "timedtmf": "4000",      "timeout": "30",      "min": "0",      "max": "1"    }  ]}'
        },
        function (response, body) {
          console.log('Status:', response.statusCode)
          console.log('Headers:', JSON.stringify(response.headers))
          console.log('Response:', body)
          res.status(201).send(body);
        }
      )
    }
  )
};

exports.put = (req, res, next) => {
  let id = req.params.id;
  res.status(201).send(`Rota PUT com ID! --> ${id}`);
};

exports.delete = (req, res, next) => {
  let id = req.params.id;
  res.status(200).send(`Rota DELETE com ID! --> ${id}`);
};

exports.get = (req, res, next) => {
  res.status(200).send('Rota GET!');
};

exports.getById = (req, res, next) => {
  let id = req.params.id;
  res.status(200).send(`Rota GET com ID! ${id}`);
};