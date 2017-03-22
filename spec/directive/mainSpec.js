  describe("Main directive", function() {
    var $compile,
        $rootScope;
    // Load the myApp module, which contains the directive
    beforeEach(function(){
        angular.mock.module('ngApp');
    });

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));



    it('Replaces the element with the appropriate content', function() {
      var element = $compile("<main></main>")($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain("Hello");
    });
  });
  