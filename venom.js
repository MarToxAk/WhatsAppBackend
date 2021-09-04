const express = require('express');
const cors = require('cors');
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