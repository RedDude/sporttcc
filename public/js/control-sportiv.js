
(function () {
  
  window.SITVC = {
    self : null,
    socket : null,
    game: null,
  
    initialize : function(socketURL) {
      this.self = this;
      this.socket = io.connect(socketURL);
      this.socket.emit('getGame', 25);
      this.socket.on('setGame', this.setGame);
      this.socket.on('setCurrentScoreboard', this.setCurrentScoreboard);
    },

    setGame : function(gameData) {
      game = JSON.parse(gameData);
      var scope = angular.element($("html")).scope();
      scope.$apply(function(){

        scope.game = game;
        scope.teamHome = game.teamHomePlayers;
        scope.teamGuest = game.teamGuestPlayers;
        teamHome.setValue(game.teamHomeGoals);
        teamGuest.setValue(game.teamGuestGoals);
      });

    },

    setCurrentScoreboard :function(goalData) {
     if(self.game.idTeamHome == goalData.teamId){
          var team = teamHome;
          self.game.teamHomeGoals += 1;
          team.setValue(self.game.teamHomeGoals);
        }else{
          var team = teamGuest;
          self.game.teamGuestGoals += 1;
          team.setValue(self.game.teamGuestGoals);
        }
      },

    send : function(data) {
      data.game = game.idGame;
      data.date = new Date();

      if(data.hasOwnProperty("playerId")){
        this.socket.emit('newEvent', data);
        return;
      }
      if(data.hasOwnProperty("message")){
        this.socket.emit('newMessage', data);
        return;
      }
      return false;
    }
  };

   $('#send').click(function() {
        var notification = {
          team:"event",
          message:"",
          date: new date(),
          game: game.idGame
        }
        SITVC.send();
      });
}());