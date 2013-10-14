var express = require('express');
var fs = require('fs');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
//var io = require('socket.io').listen(server, { log: false });
io.set('log level', 1);
var connectCounter = 0;
// socket.on('connect', function() { connectCounter++; console.log("Connect Counter: "+connectCounter); }) 
// socket.on('disconnect', function() { connectCounter--; console.log("Connect Counter: "+connectCounter); })

//io.set('transports', ['xhr-polling']);
server.listen(3000);

var da = require('./da');

function log(msg){
   console.log(msg);
}

//app.use("/", express.static(__dirname + '/control.html'));

app.use("/", express.static(__dirname + '/public'));

app.get('/control', function(req, res) {
    fs.readFile(__dirname + '/public/control.html', 'utf8', function(err, text){
        res.send(text);
    });
});
//WebService
// app.get("/teamlist", function(req, res){
//   da.teamDAO.list(function(result) {
//     res.end(JSON.stringify(result));
//   });
// });

io.sockets.on('connection', function (socket) {
 // console.log(da.goalDAO.listNextGames()); //EDERSON: TESTAR DAOS AQUI

  socket.on('msg', function (data) {
    io.sockets.emit('new', data);

  });
  
socket.on('getGame', function (id) {
   da.gameDAO.getById(id, function(result) {
     io.sockets.emit('setGame', JSON.stringify(result));
  });
 });


  socket.on('newEvent', function (data) {
    if(data.action == "goal"){
      var goal = {
        type: "goal",
        game: 1,
        player: 1,
        time: new Date(),
        isOwn: false
      };
      io.sockets.emit('notify', goal);
      return;
  }
  if(data.action == "red"){
     var card = {
        type: "card",
        player: "Red Dude",
        time: new Date(),
        isRed: true
      };
    io.sockets.emit('notify', card);
      return;
  }
  if(data.action == "yellow"){
      var card = {
        type: "card",
        player: "Yellow Man",
        time: new Date(),
        isRed: false
      };
    io.sockets.emit('notify', card);
      return;
  }
  if(data.action == "own"){
    console.log("own");
      return;
  }
     
  });
	
})


