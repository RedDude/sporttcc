module.exports = new GoalDAO(con);
function GoalDAO(con) {
	//private
	var connection = con;

	return {
    	//public
    	insert : function(goal, callback) {
    		connection.query("INSERT INTO goal (id_game, id_player, id_team, own_goal, date_goal)"	
    			+"VALUES (?, ?, ?, ?, ?)", 
    			[goal.game, goal.playerId, goal.teamId, goal.isOwn, goal.date]
    			, function(err, result, fields) {
    				if (err){throw err};
    				if(callback)
    					callback(result);
    				return result;
    			});
    	},

    	list : function(callback) {
    		var sql= "SELECT "
    		+"goal.id_goal , goal.own_goal , goal.date_goal , goal.id_game ," 
    		+"player.id_player , player.position, player.name, player.number, player.id_team "    
    		+"FROM goal INNER JOIN player ON goal.id_player = player.id_player"
    		connection.query(sql, function(err, result, fields) {
    			if (err){throw err};
    			if(callback)
    					callback(result);
    			return result;
    		});
    	},

    	getById : function(id,callback) {
    		var sql= "SELECT "
    		+"goal.id_goal , goal.own_goal , goal.date_goal , goal.id_game ," 
    		+"player.id_player , player.position, player.name, player.number, player.id_team "    
    		+"FROM goal INNER JOIN player ON goal.id_player = player.id_player "
    		+"WHERE goal.id_goal = ?"
    		connection.query(sql, [id], function(err, result, fields) {
    			if (err){throw err};
				if(callback)
    					callback(result);
				return result;
    		});
    	}
    }
};
