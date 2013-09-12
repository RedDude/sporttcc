(function() {


	window.Scoreboard = {
		socket: null,
		POSITIONS: ["bottom_right", "top_right", "top_left", "bottom_left"],
		currentPosition: 0,

		initialize: function(socketURL) {
			this.socket = io.connect(socketURL);
			
			document.addEventListener("keydown", this.keydownhandler, true);

			$('#send').click(function() {
				Scoreboard.send();
			});

			$('#message').keyup(function(evt) {
				if ((evt.keyCode || evt.which) == 13) {
					Scoreboard.send();
					return false;

				}
			});

			this.socket.on('new', this.add);

			this.socket.on('notify', this.notify);
		},

		send: function() {
			this.socket.emit('msg', {
				name: $('#name').val(),
				msg: $('#message').val()
			});

			$('#message').val('');

			return false;
		},

		notify: function(data) {
			$('#scoreboard').fadeIn();
			var gols = parseInt($('#score1').text());
			document.getElementById('goalAudio').play();
			document.getElementById('crowdAudio').play();
			$('#score1').text(gols + 1);
			setTimeout(scoreBoardOut, 3000);
		},

		scoreboardOut: function() {
			$('#scoreboard').fadeOut();
		},

		displayTable: function() {
			var table = $("#table");
				if (table.css("display") == "none")
					table.fadeIn();
				else
					table.fadeOut();
		},
		
		changeScoreboardPosition: function() {
			Scoreboard.currentPosition++;
				if (Scoreboard.currentPosition == Scoreboard.POSITIONS.length)
					Scoreboard.currentPosition = 0;
				$("#scoreboard").attr("class", Scoreboard.POSITIONS[Scoreboard.currentPosition]);
		},

		keydownhandler: function(e) {
			if (e.keyCode == 51) {
				$('#scoreboard').fadeIn();
				setTimeout(scoreBoardOut, 3000);
			}
			if (e.keyCode == 49) {
				Scoreboard.changeScoreboardPosition(); 
			}
			if (e.keyCode == 50) {
				Scoreboard.displayTable();
			}
			// if (e.keyCode == VK_ENTER) 
			// { 
			// // show playcontrol keyboard on OK 
			// // link the play-action to play_video(); 
			// } 
			// if (e.keyCode == VK_PLAY) 
			// { 
			// play_video(); 
			// } 
		},

		add: function(data) {
			var name = data.name || 'anonymous';
			var msg = $('<div class="msg"></div>').append('<span class="name">' + name + '</span>: ').append('<span class="text">' + data.msg + '</span>');

			$('#messages').append(msg).animate({
				scrollTop: $('#messages').prop('scrollHeight')
			}, 0);
		},

	};
}());