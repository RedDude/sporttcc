module.exports = new CardDAO(con);
function CardDAO(con) {
	//private
	var connection = con;

	return {
    	//public
    	insert : function(card, callback) {
    		connection.query("INSERT INTO card (id_game, id_player, id_team, red_card, date_card)"	
    			+"VALUES (?, ?, ?, ?, ?)", 
    			[card.game, card.playerId, card.teamId, card.isRed, card.date]
    			, function(err, result, fields) {
    				if (err){throw err};
    				if(callback)
    					callback(result);
    				return result;
    			});
    	},

    	list : function(callback) {
    		var sql= "SELECT "
    		+"card.id_goal , card.red_card , card.date_card , card.id_game ," 
    		+"player.id_player , player.position, player.name, player.number, player.id_team "    
    		+"FROM card INNER JOIN player ON card.id_player = player.id_player"
    		connection.query(sql, function(err, result, fields) {
    			if (err){throw err};
    			if(callback)
    					callback(result);
    			return result;
    		});
    	},

    	getById : function(id,callback) {
    		var sql= "SELECT "
    		+"card.id_goal , card.red_card , card.date_card , card.id_game ," 
    		+"player.id_player , player.position, player.name, player.number, player.id_team "    
    		+"FROM card INNER JOIN player ON card.id_player = player.id_player "
    		+"WHERE card.id_card = ?"
    		connection.query(sql, [id], function(err, result, fields) {
    			if (err){throw err};
				if(callback)
    					callback(result);
				return result;
    		});
    	}
    }
};
