 var socket = io.connect('IPDELSERVIDOR',{'forceNew':true});

 socket.on('messages', function(data){
 	//recibe los datos que le llegan del servidor
    console.log(data);
    render(data);
});

 function render(data){
    var html = data.map(function(message, index){
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `); //recibe el nombre de usuario y el mensaje en el servidor 
    }).join(' ');
 
    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

 function addMessage(e){
 	var message = {
 		nickname: document.getElementById('nickname').value, //consigue el valor que tiene el input nickname
 		text: document.getElementById('text').value
 	};
 	document.getElementById('nickname').style.display = 'none'; //deshabilita el input de usuario para no poder cambiarlo

 	socket.emit('add-message', message); //guarda el mensaje en el servidor 
 	return false; //corta la ejecución de la función 
 }