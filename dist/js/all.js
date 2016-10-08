
var app = angular.module('app', ['chart.js','ngRoute','ngMaterial']);
app.constant('myChartColors', ['#00ADF9', '#FF8A80', '#432134', '#8A43B3']);

app.config(['$routeProvider', '$locationProvider', 'ChartJsProvider', 'myChartColors', function($routeProvider, $locationProvider, ChartJsProvider, myChartColors){
		
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
		.when('/404', {
		    templateUrl: '/partials/404.html',
		    controller: 'appController'
		})
		.otherwise({
			redirectTo: '/404'
			
		});
		$locationProvider.html5Mode(true);
}]);


app.controller("appController", ['$scope', '$route', '$routeParams', '$location', 'myChartColors', function($scope, $route, $routeParams, $location, myChartColors) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  $scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90],
    [89, 34, 57, 20, 34, 94, 23],
    [8, 32, 19, 34, 69, 75, 32]
  ];
  $scope.myChartColors = myChartColors;
  $scope.logValue = function (x, y) { 
  	$scope.data[y][this.$index] = x;
  }; 
  
  $scope.randomize = function () {
      $scope.data = $scope.data.map(function (data) {
        return data.map(function (y) {
          y = Math.random() * 100 - 5;
          // y = y + Math.random() * 10 - 5;
          return parseInt(y < 0 ? 0 : y > 100 ? 100 : y);
        });
      });
    };
  $scope.updateData = function() {
  	this.value = $scope.data;
  };
  $scope.goToggle = function () {
  		
  		if($('#go').checked()) {
  			setTimeout($scope.randomize, 200);
  		}
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

app.controller("BaseCtrl", ['$scope', function ($scope) {
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
       console.log(this);
     };
}]);


