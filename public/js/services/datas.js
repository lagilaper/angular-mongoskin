angular.module('dataservice', [])

	// super simple service
	// each function returns a promise object 
	.factory('datas', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/datas');
			},
			create : function(data) {
				return $http.post('/api/datas', data);
			},
			delete : function(id) {
				return $http.delete('/api/datas/' + id);
			}
		}
	}]);