conversionApp.controller('MetricConversionController', function($scope) {
	$scope.km = '';
	$scope.mile = 0;

	$scope.kmToMile = function() {
		if($scope.km) {
			$scope.mile = $scope.km * 0.621371192;
		}
		else {
			$scope.mile = 0;
		}
	};

});