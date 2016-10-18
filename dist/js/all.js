
var app = angular.module('app', ['chart.js','ngRoute','ngMaterial','ngResource','ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.constant('myChartColors', ['#00ADF9', '#FF8A80', '#432134', '#8A43B3']);

app.config(['$routeProvider', '$locationProvider', 'ChartJsProvider', 'myChartColors', function($routeProvider, $locationProvider, ChartJsProvider, myChartColors){

	//ChartJsProvider.setOptions({ chartColors: myChartColors });
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html'
		})
		.otherwise({
			redirectTo: '/'

		});

}]);
app.factory('UserService', function ($resource) {
	    return $resource(encodeURI('http://api.population.io:80/1.0/population/2015/United States/'));///:user',{user: "@user"});
});

app.service('CountryService', function ($resource) {
	    return $resource(encodeURI('http://api.population.io:80/1.0/countries'));///:user',{user: "@user"});
});

app.controller("appController", ['$scope', '$http', '$route', '$routeParams', '$location', 'myChartColors', 'UserService', 'CountryService', function($scope, $http, $route, $routeParams, $location, myChartColors, UserService, CountryService) {
  $scope.allCountries = [];
  $scope.showInput = true;
  $scope.title = "Random Data";
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  $scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  $scope.series = ['Series A', 'Series B', 'Series C', 'Series D'];
  $scope.options = {
  	title: {
  		display: true,
  		text: 'Chart Title'
  	}
  };
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90],
    [89, 34, 57, 20, 34, 94, 23],
    [8, 32, 19, 34, 69, 75, 32]
  ];
  $scope.users = UserService.query();
  // console.log($scope.users);
  $scope.country = CountryService.get();
	// console.log($scope.country);

  // var arr = $scope.country["$promise"]["$$state"];


  $scope.myChartColors = myChartColors;
  $scope.logValue = function (x, y) {
  	$scope.data[y][this.$index] = x;
  };
  $scope.goAPI = function() {
    		// console.log($scope.users.length);
    		$scope.allCountries = [];
    		$scope.showCountry = true;
    		var thisCountry = "United States 2016";
    		$scope.allCountries.push(thisCountry);
    		console.log($scope.allCountries);
    		$scope.showInput = false;
    		$scope.data = [];
    		$scope.labels = [];
    		$scope.series = [thisCountry + ' - Males', thisCountry + ' - Females'];
    		$scope.title = "2016 Country Population by Age and Gender";
    	// for (var key in $scope.users) {
    	var thisLength = $scope.users.length, tmpArray = [], tmpArray2 = [];
    	for (i = 0; i < thisLength; i = i + 5) {
    	 	// console.log($scope.users[i].males);
    	 	tmpArray.push($scope.users[i].males);
    	 	tmpArray2.push($scope.users[i].females);
    	 	$scope.labels.push(i);
    	}
    	$scope.data.push(tmpArray);
    	$scope.data.push(tmpArray2);

    };

  $scope.goCountries = function() {
  		//console.log(this);
  		$scope.showCountry = true;

  };
  $scope.countrySelected = function() {
  		var tmpArray = [], tmpArray2 = [];
  		var x = document.getElementById("listCountries");

  		// thisCountry = x.options[x.selectedIndex].value;
			thisCountry = x.value;
      if (thisCountry == '') thisCountry = "World";
      console.log(thisCountry);
  		x = document.getElementById("listYears");

  		// thisYear = x.options[x.selectedIndex].value;
      thisYear = x.value;
  		if ($.inArray(thisCountry + " " + thisYear, $scope.allCountries) == -1) {
	  		
	  		var thisURL = encodeURI("http://api.population.io:80/1.0/population/" + thisYear + "/" + thisCountry);
	  		// console.log(thisURL);
	  		var newData = $http.get(thisURL)
	  			.success(function(newData) {
            $scope.allCountries.push(thisCountry + ' ' + thisYear);
	  				thisLength = newData.length;
            console.log(thisLength);
	  				for (i = 0; i < thisLength; i = i + 5) {
			    	 	// console.log($scope.users[i].males);
			    	 	tmpArray.push(newData[i].males);
			    	 	tmpArray2.push(newData[i].females);
			    	 	//console.log(newData[i].males);

    	    	}
    	    	$scope.data.push(tmpArray);
    	    	$scope.data.push(tmpArray2);
    	    	$scope.series.push([thisCountry + ' ' + thisYear + ' - Males']);
    	    	$scope.series.push([thisCountry + ' ' + thisYear + ' - Females']);
	  				//$scope.data.push(newData);
	  			})
          .error(function (error, status){
            $scope.data.error = { message: error, status: status};
            console.log($scope.data.error.status); 
          }); 
	  	}

  	};
  $scope.removeCountry = function() {
  	console.log(this.thisCountry);
  	var arrPos = $.inArray(this.thisCountry, $scope.allCountries);
  	console.log(arrPos);
  	$scope.allCountries.splice(arrPos, 1 );
  	console.log($scope.series[arrPos]);
  	$scope.series.splice(arrPos*2, 2 );
  	console.log($scope.data);
  	$scope.data.splice(arrPos*2, 2);
  	console.log($scope.allCountries);
  };
  $scope.randomize = function () {
  	  $scope.showCountry = false;
  	  $scope.showInput = true;
  	  $scope.title = "Random Data";
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
	var _selected;

  $scope.selected = undefined;
  $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  // Any function returning a promise object can be used to load values asynchronously
  $scope.getLocation = function(val) {
    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        return item.formatted_address;
      });
    });
  };

  $scope.ngModelOptionsSelected = function(value) {
    if (arguments.length) {
      _selected = value;
    } else {
      return _selected;
    }
  };

  $scope.modelOptions = {
    debounce: {
      default: 500,
      blur: 250
    },
    getterSetter: true
  };
}]);

app.controller("lineController", ['$scope', '$route', '$http', '$routeParams', '$location', 'myChartColors', function($scope, $route, $http, $routeParams, $location, myChartColors) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;

  $scope.gender = "male";
  $scope.country = URLEncode("United States");
  $scope.dob = "";



  $scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [66, 59, 80, 81, 56, 55, 40]
  ];
  $scope.myChartColors = myChartColors;


  $scope.updateData = function() {
  	this.value = $scope.data;
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
