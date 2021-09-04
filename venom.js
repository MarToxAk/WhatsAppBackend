const express = require('express');
const cors = require('cors');
const request = require('request')
const app = express();
var http = require('http').Server(app);
// passa o http-server par ao socketio
var io = require('socket.io')(http);

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
io.on('connection', (socket) => {
	//console.log('conectado')
	socket.on('pedido', async (teste) => {
		io.emit('pizzaria', teste);

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
						body: '{  "caller": "38389001",  "called": "1238967100",  "audios": [    {      "audio": "Olá, você tem um novo pedido no aplicativo",      "positionAudio": 1    }  ],  "dtmfs": [    {      "audio": "para aceita o pedido, digite 1, se não, digite 2",      "positionAudio": 2,      "timedtmf": "4000",      "timeout": "30",      "min": "0",      "max": "1"    }  ]}'
					},
					function (response, body) {
						console.log('Status:', response.statusCode)
						console.log('Headers:', JSON.stringify(response.headers))
						console.log('Response:', body)
					}
				)
			}
		)
	})
	socket.on('pedidostatus', (teste) =>{
		io.emit('pedidostatus', teste)
	})
});
require('./src/Routes/index')(app); // <--- basta adicionar essa linha


app.use(cors());
app.use(express.json());
var porta = process.env.PORT || 8080;

http.listen(porta, function(){
  console.log('Servidor rodando em: http://localhost:'+porta);
});