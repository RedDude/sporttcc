function SporttvCtrl($scope, localStorageService, $modal) {
  $scope.teamsA = [
  {"name": "Time 1",
  "badge": "1",
  "id": "1"},
  {"name": "Time 2",
  "badge": "2",
  "id": "2"},
  {"name": "Time 3",
  "badge": "3",
  "id": "3"},
  {"name": "Time 4",
  "badge": "4",
  "id": "4"},
  {"name": "Time 5",
  "badge": "5",
  "id": "5"},
  {"name": "Time 6",
  "badge": "6",
  "id": "6"},
  {"name": "Time 7",
  "badge": "7",
  "id": "7"}
  ];
  $scope.teamsB = [
  {"name": "Time 1",
  "badge": "1",
  "id": "8"},
  {"name": "Time 2",
  "badge": "2",
  "id": "9"},
  {"name": "Time 3",
  "badge": "3",
  "id": "10"},
  {"name": "Time 4",
  "badge": "4",
  "id": "11"},
  {"name": "Time 5",
  "badge": "5",
  "id": "12"},
  {"name": "Time 6",
  "badge": "6",
  "id": "13"},
  {"name": "Time 7",
  "badge": "7",
  "id": "14"}
  ];

  $scope.tabs = [
  {"name": "Série A",
  "teams": $scope.teamsA},
  {"name": "Série B",
  "teams": $scope.teamsB }
  ];

  $scope.allTeams = $scope.teamsA.concat($scope.teamsB);

  $scope.teams = localStorageService.get('config.teams');;
  $scope.notification = localStorageService.get('config.notification');
  $scope.position = localStorageService.get('config.position');
  $scope.noSound = localStorageService.get('config.noSound');

  $scope.interval = 800;
  var slides = $scope.slides = [];


  $scope.findTeam = function(teamId) {
    var team = null;
    var result = $.grep($scope.allTeams, function(e){ return e.id == teamId; });
    if (result.length == 1) {
      team = result[0];
      return team;
    }
  }
  $scope.addBadge = function(badge) {
    slides.push({
      image: badge
    });
  };

  $scope.getBadges = function(selectedTeams) {
    console.log(selectedTeams);
    var teams = angular.fromJson(selectedTeams);
    var team = null;

    for (var i = teams.length - 1; i >= 0; i--) {
      if(teams[i] != null && teams[i] != false){
        team = $scope.findTeam(teams[i]);
        console.log(team);
        if(teams != null){
          $scope.addBadge(team.badge);
        }
      }
    }
  };

  $scope.$watch('teams', function(value){
    localStorageService.add('config.teams',value);
    slides.length = 0;
   $scope.getBadges(value);
  }, true);

  $scope.$watch('notification', function(value){
    localStorageService.add('config.notification',value);
  }, true);

  $scope.$watch('position', function(value){
    localStorageService.add('config.position',value);
  }, true);

  $scope.$watch('noSound', function(value){
   console.log( localStorageService.get('config.noSound'));
   if(value == false){value = null;}
   localStorageService.add('config.noSound',value);
 }, true);

  $scope.storageType = 'LocalStorage';
  if (!localStorageService.isSupported()) {
    $scope.storageType = 'Cookie';
  }

} 