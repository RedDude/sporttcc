
(function () {
  window.SITVC = {
    socket : null,
  
    initialize : function(socketURL) {
      this.socket = io.connect(socketURL);

      $('#send').click(function() {
        var notification = {
          team:"1",
          type:"goals",
          
        }
        SITVC.send();
      });

    },

    add : function(data) {
      var name = data.name || 'anonymous';
      var msg = $('<div class="msg"></div>')
        .append('<span class="name">' + name + '</span>: ')
        .append('<span class="text">' + data.msg + '</span>');

      $('#messages')
        .append(msg)
        .animate({scrollTop: $('#messages').prop('scrollHeight')}, 0);
    },
 
    send : function(data) {

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
}());