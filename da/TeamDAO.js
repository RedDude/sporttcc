module.exports = new TeamDAO(con);
function TeamDAO(con) {
	//private
    var connection = con;

    return {
    	//public
    	list : function(callback) {
    		connection.query('SELECT * FROM team', function(err, result, fields) {
    			if (err){ throw err; }
    			if(callback)
    					callback(result);
    			return result;
    		});
    	},

    	getSerie : function(serie, callback) {
    		connection.query('SELECT * FROM team WHERE serie = ?', [serie]
    			, function(err, result, fields) {
    				if (err){ throw err; }
    				if(callback)
    					callback(result);
    				return result;
    			});
    	},
    	getPlayers : function(id,callback) {
    		connection.query('SELECT * FROM player WHERE id_team = ?', 
    			[id], function(err, result, fields) {
    			if (err){ throw err; }
    			if(callback)
    				callback(result);
    			return result;
    		});
    	},
    	getById : function(id,callback) {
    		connection.query('SELECT * FROM team WHERE id_team = ?', 
    			[id], function(err, result, fields) {
    			if (err){ throw err; }
    			if(callback)
    					callback(result[0]);
    			return result[0];
    		});
    	}
    }
};
