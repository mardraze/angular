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
