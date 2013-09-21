var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
//io.set('transports', ['xhr-polling']);
server.listen(3000);

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'eu-cdbr-west-01.cleardb.com',
  user     : 'b459ba42a01c5a',
  password : '803a9d64',
  database : 'af_7c343d9f0da5767'
}); //trocar para variaveis de ambienteconnection.connect();

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
	
	console.log('HERE!');
	connection.query('SELECT * FROM team', function(err, rows, fields) {
	  if (err) throw err;

	  console.log('Result: ', rows);
	});

	connection.end();
  });
});