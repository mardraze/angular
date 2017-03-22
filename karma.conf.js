module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    plugins: [require("karma-jasmine")],
    files: [
        './node_modules/angular/angular.js',    
        './node_modules/angular-mocks/angular-mocks.js',
        './out/build/app.js',
      'spec/**/*.js'
    ]
  });
};
