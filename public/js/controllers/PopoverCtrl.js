function PopoverCtrl($scope) {

	$scope.sendAction = function(pId){

		var playerId = pId;
		var action = null;

		for(var key in $scope.actions){
			if($scope.actions[key] == true){
				action = {
					"playerId": playerId,
					"action": key
				}
				SITVC.send(action);
			}
		}
	}
}