angular.module('ngApp', []);

angular.module('ngApp')
/** @ngInject */
.controller('ExampleController', ["$scope", function($scope) {
  $scope.password = '';
  $scope.grade = function() {
    var size = $scope.password.length;
    if (size > 8) {
      $scope.strength = 'strong';
    } else if (size > 3) {
      $scope.strength = 'medium';
    } else {
      $scope.strength = 'weak';
    }
  };
}]);
angular.module('ngApp')
/** @ngInject */
.directive('example', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            scope.text = 'Hello';
        },
        templateUrl: 'directive/example.html'
    };
});

angular.module('ngApp')
/** @ngInject */
.factory('Api', ["$http", "$q", function ($http, $q) {
    var get = function (url) {
        var defer = $q.defer();
        $http.get(url).then(function(res){
            if(res && res.data.success){
                defer.resolve(res.data.result);
            }else{
                defer.reject(res.data.errorMessage);
            }
        }).catch(function(){
            defer.reject('HTTP ERROR');
        });
        return defer.promise;
    };
    
    var post = function (url, params) {
        var defer = $q.defer();
        $http.post(url, params).then(function(res){
            if(res && res.data.success){
                defer.resolve(res.data.result);
            }else{
                defer.reject(res.data.errorMessage);
            }
        }).catch(function(){
            defer.reject('HTTP ERROR');
        });
        return defer.promise;
    };
    var cache = {};
    var postCache = function(url, params){
        var defer = $q.defer();
        var cacheKey = JSON.stringify({
            url: url,
            params: params
        });
        if(cache[cacheKey]){
            defer.resolve(cache[cacheKey]);
        }else{
            post(url, params).then(function(res){
                cache[cacheKey] = res;
                defer.resolve(cache[cacheKey]);
            }).catch(function(err){
                defer.reject(err);
            });
        }
        return defer.promise;
    };
    
    return {
        get: get,
        post: post,
        postCache: postCache
    };
}]);