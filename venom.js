const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
require('./src/Routes/index')(app); // <--- basta adicionar essa linha


io.on('connection', (socket) => {
	//console.log('conectado')
	socket.on('pedido', (teste) => {
		io.emit('pizzaria', teste);
	})
	socket.on('pedidostatus', (teste) =>{
		io.emit('pedidostatus', teste)
	})
});

app.use(cors());
app.use(express.json());
var porta = process.env.PORT || 8080;

app.listen(porta);
