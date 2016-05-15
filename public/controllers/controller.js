var myApp = angular.module('myApp',[]);


/*Start AppCtrl*/
myApp.controller('AppCtrl',['$scope', '$http', function($scope, $http){
	console.log("Hello from AppCtrl");

	var refresh = function() {
		$http.get('/contactlist').success(function (response){
			console.log("I got the data i requested at the Controller");
			console.log(response);
			$scope.contactlist = response;
			$scope.contact = '';
		});
	};

	refresh();
	//Add Contact
	$scope.addContact = function(){
		console.log("Scope.contact is:");
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function(response){
			console.log("the response from the post request is:");
			console.log(response);
			refresh();
		});
	};

	//Remove Contact
	$scope.remove = function(id){
		console.log("The contact ID is:");
		console.log(id);
		$http.delete('/contactlist/' + id).success(function(response){
			refresh();
		});
	};

	//Edit Contact
	$scope.edit = function(id){
		console.log("The ID is:" + id);
		$http.get('/contactlist/' + id).success(function(response){
			$scope.contact = response;
		});
	};

	//Update Contact
	$scope.update = function(){
		console.log("The ID is:" + $scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};

	//Clear Contact
	$scope.deselect = function(){
		$scope.contact = '';
	};

}]);
/*End AppCtrl*/