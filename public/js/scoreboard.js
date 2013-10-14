(function() {
	window.Scoreboard = {
		socket: null,
		timeout: null,
		POSITIONS: ["ne", "se", "sw", "nw"],
		currentPositionIndex: 0,
		position: null,
		lastPosition: null,

		initialize: function(socketURL) {
			this.socket = io.connect(socketURL);
			
			this.position = localStorage.getItem('ls.config.position');
			if(this.position == null){
				this.position = 'nw';
			}
			Scoreboard.changeScoreboardPosition(this.position);

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

		gols : 0
		,
		notify: function(data) {

			// for(var key in data){
			// 	if(data[key] == true){
			// 		action = {
			// 			"playerId": playerId,
			// 			"action": key
			// 		}
			// 		SITVC.send(action);
			// 	}
			// }


			window.clearTimeout(Scoreboard.timeout);
		
			if(data.type == "goal"){
				$("#goal-notification").show();
				$("#score-notification").show();
				$("#card-notification").hide();
				Scoreboard.gols += 1;

				var noSound = localStorage.getItem('ls.config.noSound');
				if(noSound == "null" || noSound == null || noSound == false){
					document.getElementById('goalAudio').play();
					document.getElementById('crowdAudio').play();
				}

				teamHome.setValue(Scoreboard.gols);
			}

			if(data.type == "card"){
				$("#goal-notification").hide();
				$("#score-notification").hide();
				$("#card-notification").show();
				var noSound = localStorage.getItem('ls.config.noSound');
				if(noSound == "null" || noSound == null || noSound == false){
					document.getElementById('crowdAudio').play();
				}
				var iconSrc = "images/yellowCard.svg";
				if(data.isRed == true)
					iconSrc = "images/redCard.svg"

				$("#card-notification-icon").attr('src',iconSrc);
				$("#card-notification-name").text(data.player);
			}
		
			$('#scoreboard').fadeIn();
			Scoreboard.timeout = setTimeout(Scoreboard.scoreboardOut, 3000);
		},

		scoreboardOut: function() {
		
			$('#scoreboard').fadeOut(function(){
				$("#goal-notification").hide();
				$("#score-notification").show();
				$("#card-notification").hide();
			});
		},

		configToggle: function() {
			$('#config').slideToggle();
		},

		displayTable: function() {
			var table = $("#table");
				if (table.css("display") == "none")
					table.fadeIn();
				else
					table.fadeOut();
		},

		displayScoreboard: function() {
			var scoreboard = $("#scoreboard");
				if (scoreboard.css("display") == "none")
					scoreboard.fadeIn();
				else
					Scoreboard.scoreboardOut();
		},

		changeScoreboardPosition: function(position) {
			$("#scoreboard").removeClass(Scoreboard.lastPosition);
			$("#scoreboard").addClass(position);
			Scoreboard.lastPosition = position;
		},
		
		changeKeyScoreboardPosition: function() {
			$("#scoreboard").removeClass(Scoreboard.POSITIONS[Scoreboard.currentPositionIndex]);
			Scoreboard.currentPositionIndex++;
				if (Scoreboard.currentPositionIndex == Scoreboard.POSITIONS.length)
					Scoreboard.currentPositionIndex = 0;
				$("#scoreboard").addClass(Scoreboard.POSITIONS[Scoreboard.currentPositionIndex]);
		},

		keydownhandler: function(e) {
			if (e.keyCode == 51) {
				Scoreboard.displayScoreboard();
				// $('#scoreboard').fadeIn();
				// setTimeout(scoreBoardOut, 3000);
			}
			if (e.keyCode == 49) {
				Scoreboard.changeKeyScoreboardPosition(); 
			}
			if (e.keyCode == 50) {
				Scoreboard.displayTable();
			}
			if (e.keyCode == 54) {
				Scoreboard.configToggle();
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