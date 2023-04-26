const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Ruta para el archivo HTML
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// Escuchar la conexión de Socket.IO
io.on('connection', function(socket){
    console.log('Usuario conectado');

    var username1 = ""
    var username2 = ""
    var imagen1 = ""
    var imagen2 = ""
    //Escuhar datos de usuarios
    socket.on('date 1', function(name,image){
      	username1 = name
        imagen1 = image
        io.emit('dateimage1',username1,imagen1);
    });

    socket.on('date 2', function(name,image){
        username2 = name
        imagen2 = image
        io.emit('dateimage2',username2,imagen2);
    });

    // Escuchar el evento 'chat message 1' para el chat 1
    socket.on('chat message 1', function(msg,hora){
        io.emit('chat message 1', msg,hora);
    });

    // Escuchar el evento 'chat message 2' para el chat 2
    socket.on('chat message 2', function(msg,hora){
        io.emit('chat message 2', msg,hora);
    });

    // Escuchar la desconexión del usuario
    socket.on('disconnect', function(){
        console.log('Usuario desconectado');
    });
});

// Iniciar el servidor HTTP en el puerto 3000
http.listen(3000, function(){
    console.log('Servidor escuchando en http://localhost:3000');
});
