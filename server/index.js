var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

var messages = [{
	id:1,
	text: 'Bienvenido al chat',
	nickname: 'Admin'
}];

app.get('/hola-a-todos', function(req, res){
	res.status(200).send('hola a todos desde una ruta');
});
/*Conexiónes con el servidor obteniendo la IP de donde se está conectando*/
io.on('connection', function(socket){
	console.log("El Cliente con IP:"+socket.handshake.address+" se ha conectado...");

		socket.emit('messages', messages); //emite los mensajes desde el servidor 
		socket.on('add-message', function(data){
		messages.push(data); //añade datos al array messages
		io.sockets.emit('messages', messages); //emite los mensajes a todos los clientes

	});//socket.on = función de socket.io para recoger un evento 
});

server.listen(6677, function() {
	console.log('Servidor habilitado y en funionamiento');
});