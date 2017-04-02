angular.module('ngApp').run(['$templateCache', function($templateCache) {  'use strict';

  $templateCache.put('directive/example.html',
    "<div ng-bind=\"text\"></div>\n"
  );
}]);