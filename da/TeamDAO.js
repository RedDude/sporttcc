module.exports = new TeamDAO(con);
function TeamDAO(con) {
	//private
    var connection = con;

    return {
    	//public
    	list : function(callback) {
    		console.log("list Team");
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
    	}
    }
};
