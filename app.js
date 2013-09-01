var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
io.set('transports', ['xhr-polling']);
server.listen(3000);

//app.use("/", express.static(__dirname + '/control.html'));

app.use("/", express.static(__dirname + '/public'));

app.get("/control.html", function(req, res){
});


io.sockets.on('connection', function (socket) {
  socket.on('msg', function (data) {
    io.sockets.emit('new', data);
  });
  
  socket.on('newEvent', function (data) {
    io.sockets.emit('notify', data);
  });
});