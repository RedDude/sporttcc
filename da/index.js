var connectionFactory = require('./ConnectionFactory.js');
exports.connectionFactory = connectionFactory;
con = connectionFactory.getConnection();

exports.teamDAO = require('./TeamDAO');
exports.goalDAO = require('./GoalDAO');
exports.cardDAO = require('./CardDAO');
exports.gameDAO = require('./GameDAO');


// console.log(TeamDAO);

// module.exports = function(con){ 

// 	gameDAO : require('./GameDAO.js')(con),
// 	teamDAO : require('./TeamDAO.js')(con),
// 	goalDAO : require('./GoalDAO.js')(con)
// 	//teamDAO = require('./TeamDAO')(connection);
// 	//var goalDAO = require('./GoalDAO')(connection);

// }