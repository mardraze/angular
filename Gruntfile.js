module.exports = function(grunt) {
    var vendors = [
        'node_modules/angular/angular.min.js'
    ];
    var moduleName = 'ngApp';
    var src = 'src';
    var build = 'build';
    var devApp = '<%= variables.build %>/app.dev.js';
    var devAppAnnotate = '<%= variables.devApp %>-annotate.js';
    var devTemplates = '<%= variables.build %>/templates.js';
    var prodApp = '<%= variables.build %>/app.js';
    var prodVendor = '<%= variables.build %>/vendor.js';

    var jsFiles = ['<%= variables.src %>/module.js', '<%= variables.src %>/**/*.js'];
    var templateFiles = ['<%= variables.src %>/**/*.html'];
    
    var jasmineOptions = {
        specs: 'spec/**/*Spec.js',
        helpers: 'spec/**/*Helper.js',
        vendor: [
            '<%= variables.prodVendor %>',
            './node_modules/angular-mocks/angular-mocks.js'
        ]
    };

    grunt.initConfig({
        variables: {
            src: src,
            build: build,
            devApp: devApp,
            devAppAnnotate: devAppAnnotate,
            devTemplates: devTemplates,
            prodApp: prodApp,
            prodVendor: prodVendor
        },
        concat:   {
            app:    {
              src:  jsFiles,
              dest: '<%= variables.devApp %>'
            }
        },
        ngtemplates:  {
            html: {
              cwd:      '<%= variables.src %>',
              src:      '*/**/*.html',
              dest:     '<%= variables.devTemplates %>',
              options:      {
                bootstrap:  function(module, script) {
                  return "angular.module('"+moduleName+"')"
                          +".run(['$templateCache', function($templateCache) {" 
                      + script + "}]);";
                }
              }
            }
        },
        ngAnnotate: {
            app: {
                files: {
                    '<%= variables.devAppAnnotate %>': ['<%= variables.devApp %>']
                }
            }
        },        
        jasmine: {
          prod: {
            src: '<%= variables.prodApp %>',
            options: jasmineOptions
          },
          dev: {
            src: ['<%= variables.devApp %>', '<%= variables.devTemplates %>'],
            options: jasmineOptions
          }
        },
        uglify: {
            app: {
              files: {
                '<%= variables.prodApp %>': [
                  '<%= variables.devAppAnnotate %>',
                  '<%= variables.devTemplates %>'
                ]
              }
            },
            vendor: {
              files: {
                '<%= variables.prodVendor %>': vendors
              }
            }
        },
        watch: {
          scripts: {
            files: jsFiles,
            tasks: ['concat', 'jasmine:dev']
          },
          templates: {
            files: templateFiles,
            tasks: ['ngtemplates', 'jasmine:dev']
          },
          tests: {
            files: 'spec/**/*.js',
            tasks: ['jasmine:dev']
          }
        }
    });

    grunt.registerTask('build', [
        'ngtemplates',
        'concat',
        'jasmine'
    ]);
    grunt.registerTask('default', [
        'build'
    ]);
    
    grunt.registerTask('dist', [
        'build',
        'ngAnnotate',
        'uglify'
    ]);

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
};
