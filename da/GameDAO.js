module.exports = new GameDAO(con);
function GameDAO(con) {
	//private
	var connection = con;

	return {
    	//public
    	list : function(callback) {
    		var sql= "SELECT * FROM games"
    		connection.query(sql, function(err, result, fields) {
    			if (err){throw err};
    			if(callback)
    				callback(result);
    			return result;
    		});
    	},

    	listNextGames : function(callback) {
    		var sql= "SELECT * FROM game WHERE game.start_date > NOW()"
    		connection.query(sql, function(err, result, fields) {
    			if (err){throw err};
    			if(callback)
    				callback(result);
    			return result;
    		});
    	},

    	listGamesByRound : function(round, callback) {
    		var sql= "SELECT * FROM games WHERE round = ?"
    		connection.query(sql, [round], function(err, result, fields) {
    			if (err){throw err};
    			if(callback)
    				callback(result);
    			return result;
    		});
    	},
    	
    	getGoals : function(idGame,idTeamHome,idTeamGuest, callback) {

		var sql = "SELECT "
			 +"SUM(CASE WHEN id_team=? THEN 1 ELSE 0 END) AS teamHome, "
			 +"SUM(CASE WHEN id_team=? THEN 1 ELSE 0 END) AS teamGuest "
			 +"FROM goal WHERE id_game=?;"

		connection.query(sql, [idTeamHome,idTeamGuest,idGame], function(err, result, fields) {
    			if (err){throw err};
    			if(callback)
    				callback(result[0]);
    			return result[0];
    		});
    	},

    	getById : function(id, callback) {

		var sql = "SELECT game.id_game , stadium.id_stadium , stadium.city , stadium.name_stadium , stadium.capacity , game.id_team_home, game.id_team_guest , team_guest.badge AS team_guest_badge , team_guest.name AS team_guest_name , team_guest.serie AS team_guest_serie , team_guest.id_stadium AS team_guest_stadium , team_home.id_stadium AS team_home_stadium , team_home.badge AS team_home_badge , team_home.name AS team_home_name , game.round , game.start_date , game.end_first_time , game.begin_second_time , game.final_date FROM game INNER JOIN team AS team_home ON (game.id_team_home = team_home.id_team) INNER JOIN team AS team_guest ON (game.id_team_guest = team_guest.id_team) INNER JOIN stadium ON (game.id_stadium = stadium.id_stadium) "
    		+ "WHERE game.id_game = ?";

		connection.query(sql, [id], function(err, result, fields) {
    			if (err){throw err};
    			if(callback)
    				callback(result[0]);
    			return result[0];
    		});
    	}
    };
}