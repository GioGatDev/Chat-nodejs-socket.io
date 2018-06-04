 var socket = io.connect('http://192.168.1.133:6677',{'forceNew':true});

 socket.on('messages', function (data) {
 	// recibe los datos que llegan del servidor 
 	console.log(data);
 	render(data);
 });

 function render(data) {
 	// body...
 	var html = data.map(function(message, index){
 		return(`
 			<div class="message">
 			<strong>${message.nickname} </strong>
 			<p>${message.text}</p>
 			</div>
 			`);//recibe el nombre del usuario y el mensage

 	}).join(' '); //dar espacio entre parrafo

 	document.getElementById('mensajes').innerHTML = html;
 }