//Create a chat module to use.

( function() {

  	function scoreBoardOut(){
			$('#scoreboard').fadeOut();
		}
	window.Chat = {
		socket : null,

		initialize : function(socketURL) {
			this.socket = io.connect(socketURL);

			//Send message on button click or enter
			$('#send').click(function() {
				Chat.send();
			});

			$('#message').keyup(function(evt) {
				if((evt.keyCode || evt.which) == 13) {
					Chat.send();
					return false;
				}
			});
			//Process any incoming messages
			this.socket.on('new', this.add);

			this.socket.on('notify', this.notify);
		},
		//Adds a new message to the chat.
		notify : function(data) {
			$('#scoreboard').fadeIn();
			var gols = parseInt($('#score1').text());
			document.getElementById('golAudio').play();
			document.getElementById('crowdAudio').play();
			$('#score1').text(gols + 1);
			setTimeout(scoreBoardOut, 3000);
		},
		add : function(data) {
			var name = data.name || 'anonymous';
			var msg = $('<div class="msg"></div>').append('<span class="name">' + name + '</span>: ').append('<span class="text">' + data.msg + '</span>');

			$('#messages').append(msg).animate({
				scrollTop : $('#messages').prop('scrollHeight')
			}, 0);
		},
		//Sends a message to the server,
		//then clears it from the textarea
		send : function() {
			this.socket.emit('msg', {
				name : $('#name').val(),
				msg : $('#message').val()
			});

			$('#message').val('');

			return false;
		}
	};
}());
