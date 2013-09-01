//Create a chat module to use.
(function () {
  window.SITVC = {
    socket : null,
  
    initialize : function(socketURL) {
      this.socket = io.connect(socketURL);

      //Send message on button click or enter
      $('#send').click(function() {
        SITVC.send();
      });

    },

    //Adds a new message to the chat.
    add : function(data) {
      var name = data.name || 'anonymous';
      var msg = $('<div class="msg"></div>')
        .append('<span class="name">' + name + '</span>: ')
        .append('<span class="text">' + data.msg + '</span>');

      $('#messages')
        .append(msg)
        .animate({scrollTop: $('#messages').prop('scrollHeight')}, 0);
    },
 
    //Sends a message to the server,
    //then clears it from the textarea
    send : function() {
      this.socket.emit('newEvent', {
        name: $('#name').val(),
        msg: $('#message').val()
      });

      $('#message').val('');

      return false;
    }
  };
}());