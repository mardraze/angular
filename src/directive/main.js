angular.module('ngApp')
/** @ngInject */
.directive('main', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            scope.text = 'Hello';
        },
        templateUrl: 'directive/main.html'
    };
});
