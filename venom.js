const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
require('./src/Routes/index')(app); // <--- basta adicionar essa linha
var porta = process.env.PORT || 8080;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

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
app.listen(porta);
