angular.module('ngApp').run(['$templateCache', function($templateCache) {  'use strict';

  $templateCache.put('directive/main.html',
    "<div ng-bind=\"text\"></div>\n"
  );
}]);