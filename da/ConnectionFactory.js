var mysql = require('mysql');

module.exports = ConnectionFactory;
  configNuvem = {
    host     : 'eu-cdbr-west-01.cleardb.com',
    user     : 'b459ba42a01c5a',
    password : '803a9d64',
    database : 'af_7c343d9f0da5767'
}

var config = {
     host     : 'localhost',
     user     : 'root',
     password : '',
     database : 'sportcc'
    }

function ConnectionFactory(){
     var con = null
}

ConnectionFactory.getConnection = function() {
    if (!this.con)
        this.con = ConnectionFactory.initializeConnection(config); 
    return this.con;
}

ConnectionFactory.close = function(){
    if( this.con != null)
        this.con = null;
}

ConnectionFactory.initializeConnection = function(config) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");

                    this.con = ConnectionFactory.initializeConnection(connection.config);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }

    var connection = mysql.createConnection(config);
    addDisconnectHandler(connection);
    connection.connect();
    return connection;
}
