angular.module('applicantController', [])

	// inject the applicant service factory into our controller
	.controller('mainController', ['$scope','$http','datas', function($scope, $http, datas) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all datas and show them
		// use the service to get all the datas
		datas.get()
			.success(function(data) {
				console.log(data);
				$scope.datas = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createApplicant = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				datas.create($scope.formData)

					// if successful creation, call our get function to get all the new datas
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.datas = data; // assign our new list of datas
						window.alert("Thank you for applying... :)")
					});
			}
		};

		// DELETE ==================================================================
		// delete a applicant after checking it
		$scope.deleteApplicant = function(id) {
			$scope.loading = true;

			datas.delete(id)
				// if successful creation, call our get function to get all the new datas
				.success(function(data) {
					$scope.loading = false;
					$scope.datas = data; // assign our new list of datas
				});
		};
	}]);