  var express = require('express');
  var fs = require('fs');
  var app = express();
  var server = require('http').createServer(app);
  var io = require('socket.io').listen(server);
  var async = require('async');
  //var io = require('socket.io').listen(server, { log: false });
  io.set('log level', 1);
  var connectCounter = 0;
  // socket.on('connect', function() { connectCounter++; console.log("Connect Counter: "+connectCounter); }) 
  // socket.on('disconnect', function() { connectCounter--; console.log("Connect Counter: "+connectCounter); })

  //io.set('transports', ['xhr-polling']);
  server.listen(3000);

  var da = require('./da');

  //app.use("/", express.static(__dirname + '/control.html'));

  app.use("/", express.static(__dirname + '/public'));

  app.get('/control', function(req, res) {
    fs.readFile(__dirname + '/public/control.html', 'utf8', function(err, text){
      res.send(text);
    });
  });

  io.sockets.on('connection', function (socket) {
   // console.log(da.goalDAO.listNextGames()); //EDERSON: TESTAR DAOS AQUI

   socket.on('msg', function (data) {
    io.sockets.emit('new', data);

  });

  //Back-Office
  socket.on('getGame', function (id) {
   da.gameDAO.getById(id, function(rGame) {
    da.teamDAO.getPlayers(rGame.id_team_home, function(playersTH) {
     da.teamDAO.getPlayers(rGame.id_team_guest, function(playersTG) {
      da.gameDAO.getGoals(id, 
        rGame.id_team_home, rGame.id_team_guest, function(rGoals) {
      console.log(rGoals);
      rGame.teamHomeGoals = rGoals.teamHome;
      rGame.teamGuestGoals = rGoals.teamGuest;
      rGame.teamHomePlayers = playersTH;
      rGame.teamGuestPlayers = playersTG;
        io.sockets.emit('setGame', toCamelCase(JSON.stringify(rGame)));
      });
    });
   });
  });
  });

   //Back-Office
  socket.on('setCurrentScoreboard', function (idGame) {
      da.gameDAO.getGoals(id, 
        rGame.id_team_home, rGame.id_team_guest, function(rGoals) {
      rGame.teamHomePlayers = playersTH;
      rGame.teamGuestPlayers = playersTG;
        io.sockets.emit('setCurrentScoreboard', toCamelCase(JSON.stringify(rGame)));
      });
  });

  //Front-Office
  socket.on('getSeries', function () {

     da.teamDAO.getSerie('A', function(serieA) {
      da.teamDAO.getSerie('B', function(serieB) {
        var series = {};
        series.a = serieA;
        series.b = serieB;
         io.sockets.emit('setSeries', toCamelCase(JSON.stringify(series)));
      });
  });
});

  socket.on('newEvent', function (data) {
    if(data.type == "goal"){
      data.isOwn = false;
      da.goalDAO.insert(data, function(){
          io.sockets.emit('notify', data);
          io.sockets.emit('setCurrentScoreboard', data); 
      });
      return;
    }
    if(data.type == "red"){
      data.type = 'card';
      data.isRed = true;
      da.cardDAO.insert(data, function(){
        console.log(data);
          io.sockets.emit('notify', data);
      });
    return;
  }
  if(data.type == "yellow"){
     data.type = 'card';
    data.isRed = false;
     da.cardDAO.insert(data, function(){
        console.log(data);
          io.sockets.emit('notify', data);
      });
    return;
  }
  if(data.type == "own"){
    data.isOwn = true;
    da.goalDAO.insert(data, function(){
        io.sockets.emit('notify', data);
        io.sockets.emit('setCurrentScoreboard', data); 
    });
    return;
  }

  });

  })

  function log(msg){
   console.log(msg);
  }

  function toCamelCase(string){
    return string.replace(/(\_[a-z])/g, function($1){return $1.toUpperCase().replace('_','');});
  }

