function SporttvCtrl($scope, localStorageService, $modal, $q) {



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