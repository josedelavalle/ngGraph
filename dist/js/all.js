
var app = angular.module("app", ["chart.js","ngRoute"]);
app.constant('myChartColors', ['#00ADF9', '#FF8A80']);
app.config(['$routeProvider', 'ChartJsProvider', 'myChartColors', function($routeProvider, ChartJsProvider, myChartColors){
	
	ChartJsProvider.setOptions({ chartColors: myChartColors });
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'appController'
		})
		.when('/pie', {
			templateUrl: 'views/pie.html',
			controller: 'appController'
		})
		.when('/line', {
			templateUrl: 'views/line.html',
			controller: 'appController'
		})
		.when('/bars', {
			templateUrl: 'views/bars.html',
			controller: 'appController'
		})
		.when('/doughnut', {
			templateUrl: 'views/doughnut.html',
			controller: 'appController'
		})
		.when('/radar', {
			templateUrl: 'views/radar.html',
			controller: 'appController'
		})
		.when('/dynamic', {
			templateUrl: 'views/dynamic.html',
			controller: 'BaseCtrl'
		})
		.otherwise({
			redirectTo: "/"
		});

}]);


app.controller("appController", ['$scope', '$route', '$routeParams', '$location', 'myChartColors', function($scope, $route, $routeParams, $location, myChartColors) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  $scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.myChartColors = myChartColors;
  $scope.randomize = function () {
      $scope.data = $scope.data.map(function (data) {
        return data.map(function (y) {
          y = Math.random() * 100 - 5;
          // y = y + Math.random() * 10 - 5;
          return parseInt(y < 0 ? 0 : y > 100 ? 100 : y);
        });
      });
    };
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };
 
}]);

app.controller("BaseCtrl", 'myChartColors', ['$scope', function ($scope, 'myChartColors') {
     $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
     $scope.data = [
    	[65, 59, 80, 81, 56, 55, 40],
   		[28, 48, 40, 19, 86, 27, 90]
 	 ];
     $scope.type = 'polarArea';
     $scope.randomize = function () {
         $scope.data = $scope.data.map(function (data) {
           return data.map(function (y) {
             y = Math.random() * 400;
             // y = y + Math.random() * 10 - 5;
             return parseInt(y < 0 ? 0 : y > 500 ? 500 : y);
           });
         });
       };
     $scope.toggle = function () {
       $scope.type = $scope.type === 'polarArea' ?
         'pie' : 'polarArea';
     };
}]);

