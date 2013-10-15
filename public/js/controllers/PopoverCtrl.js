function PopoverCtrl($scope) {

	$scope.submit = function(p){
		var playerName = p.number + ' - ' + p.name;
		var playerId = p.idPlayer;
		var teamId = p.idTeam;

		var data = null;
		for(var key in $scope.type){
			if($scope.type[key] == true){
				data = {
					"playerName": playerName,
					"playerId": playerId,
					"teamId": teamId,
					"type": key
				}
				SITVC.send(data);
			}
		}
	}
}