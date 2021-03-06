function SporttvConfig($scope, localStorageService, $modal, $q) {

$scope.teamsA = [{}];
$scope.teamsB = [{}];
$scope.allTeams = [{}];

	$scope.teams = localStorageService.get('config.teams');;
	$scope.notification = localStorageService.get('config.notification');
	$scope.position = localStorageService.get('config.position');
	$scope.noSound = localStorageService.get('config.noSound');

	$scope.interval = 1000;
	var slides = $scope.slides = [];

	$scope.setSeries = function(serieA,serieB){
		$scope.teamsA = serieA;
		$scope.teamsB = serieB;
		$scope.allTeams = $scope.teamsA.concat($scope.teamsB);

		$scope.tabs = [
		{"name": "Série A",
		"teams": serieA},
		{"name": "Série B",
		"teams": serieB}
		];
			
	}

	$scope.findTeam = function(teamId) {
		var team = null;
		var result = $.grep($scope.allTeams, function(e){ return e.idTeam == teamId; });
		if(result){
			if (result.length == 1) {
				team = result[0];
			}
		}
		return team;
	}

	$scope.addBadge = function(badge) {
		slides.unshift({
			image: badge
		});
	};

	$scope.getBadges = function(selectedTeams) {
		var teams = angular.fromJson(selectedTeams);
		var team = null;

		for (var i = teams.length - 1; i >= 0; i--) {
			if(teams[i] != null && teams[i] != false){
				team = $scope.findTeam(teams[i]);
				if(team != null){
					$scope.addBadge(team.badge);
				}
			}
		}
	};

	$scope.checkNoTeams = function() {
		if( $scope.teams != null &&  $scope.teams.length > 0){
			return false;
		}
		return true;
	};

	$scope.startWatch = function() {

		$scope.$watch('teams', function(value){
			if(!$scope.checkNoTeams()){
				localStorageService.add('config.teams',value);
				slides.length = 0;
				$scope.getBadges(value);
			}else{
				$scope.teams = [];
				$('#config').slideToggle();
				$scope.showModal();
			}
		}, true);

		$scope.$watch('notification', function(value){
			if(value == null){
				$scope.notification = {};
			}
			localStorageService.add('config.notification',value);
		}, true);

		$scope.$watch('position', function(value){
			if(value != null){
				localStorageService.add('config.position',value);
				Scoreboard.changeScoreboardPosition(value);
			}else{
				$scope.position = 'ne';
			}
		}, true);

		$scope.$watch('noSound', function(value){
			if(value == false){value = null;}
			localStorageService.add('config.noSound',value);
		}, true);
	};


	var modalPromise = $modal({template: 'modal.html', persist: true, show: false, keyboard: false, backdrop: 'static', scope: $scope});

// Toggle modal
$scope.showModal = function() {
	$q.when(modalPromise).then(function(modalEl) {
		modalEl.modal('show');
	});
};

$scope.storageType = 'LocalStorage';
if (!localStorageService.isSupported()) {
	$scope.storageType = 'Cookie';
}

} 