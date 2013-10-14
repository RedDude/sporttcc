function SporttvCtrl($scope, localStorageService, $modal, $q) {
  $scope.teamHome = [
  {"name": "Jogadornaldo 1",
  "badge": "1",
  "id": "1"},
  {"name": "Jogador 2",
  "badge": "2",
  "id": "2"},
  {"name": "Jogador 3",
  "badge": "3",
  "id": "3"},
  {"name": "Jogador 4",
  "badge": "4",
  "id": "4"},
  {"name": "Jogador 5",
  "badge": "5",
  "id": "5"},
  {"name": "Jogador 6",
  "badge": "6",
  "id": "6"},
  {"name": "Jogador 7",
  "badge": "7",
  "id": "7"},
  {"name": "Jogador 8",
  "badge": "8",
  "id": "8"},
  {"name": "Jogador 9",
  "badge": "9",
  "id": "9"},
  {"name": "Jogador 10",
  "badge": "10",
  "id": "10"}
  ];

  $scope.teamGuest = [
  {"name": "Jogador 1",
  "badge": "1",
  "id": "8"},
  {"name": "Jogador 2",
  "badge": "2",
  "id": "9"},
  {"name": "Jogador 3",
  "badge": "3",
  "id": "10"},
  {"name": "Jogador 4",
  "badge": "4",
  "id": "11"},
  {"name": "Jogador 5",
  "badge": "5",
  "id": "12"},
  {"name": "Jogador 6",
  "badge": "6",
  "id": "13"},
  {"name": "Jogador 7",
  "badge": "7",
  "id": "14"}
  ];


 $scope.teamModal = $scope.teamHome;
  $scope.tabs = [
  {"name": "Time1 Nome",
  "teams": $scope.teamHome},
  {"name": "Time2 Nome",
  "teams": $scope.teamGuest}
  ];

  $scope.allTeams = $scope.teamHome.concat($scope.teamGuest);

  $scope.$watch('teams', function(value){  }, true);

  var modalPromise = $modal({template: 'playersModal.html', persist: true, show: false, keyboard: true, scope: $scope});

  $scope.showModal = function(team) {
    if(team == "home"){
      $scope.teamModal = $scope.teamHome;
    }else{
      $scope.teamModal = $scope.teamGuest;
    }

    $q.when(modalPromise).then(function(modalEl) {
      modalEl.modal('show');
    });
  };

} 