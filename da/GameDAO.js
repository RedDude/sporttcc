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

    	getById : function(id, callback) {
    		console.log(id); "SELECT "
    		+"games.id_games , games.id_games , games.id_stadium , stadium.id_stadium , "
    		+"stadium.city , stadium.name_stadium , games.team_home , team_home.id_team , " 
    		+"team_home.arms , team_home.name , team_home.serie , games.team_visitor , team_guest.arms , "
    		+" team_guest.name , team_guest.serie , team_guest.id_stadium , team_home.id_stadium , "
    		+"games.round , games.start_game_date , games.finsh_first_time , games.begin_second_time , "
    		+"games.final_game_date"
    		+" FROM team AS team_home INNER JOIN games ON (team_home.id_team = games.team_home) "
    		+"INNER JOIN team AS team_guest ON (games.team_visitor = team_guest.id_team) "
    		+"INNER JOIN stadium ON (games.id_stadium = stadium.id_stadium) "
    		+"WHERE games.id_games = ?"
    		connection.query(sql, [id], function(err, result, fields) {
    			if (err){throw err};
    			if(callback)
    				callback(result);
    			return result;
    		});
    	}
    };
}