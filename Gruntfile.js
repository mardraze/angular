module.exports = function(grunt) {
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
    var pkg = grunt.file.readJSON('package.json');
    var jsFiles = ['<%= pkg.srcDir %>/module.js', '<%= pkg.srcDir %>/**/*.js'];
    grunt.initConfig({
        pkg: pkg,
        concat:   {
            app:    {
              src:  jsFiles,
              dest: '<%= pkg.outDir %>/build/app.js'
            }
        },
        ngtemplates:  {
            html: {
              cwd:      '<%= pkg.srcDir %>',
              src:      '*/**/*.html',
              dest:     '<%= pkg.outDir %>/build/templates.js',
              options:      {
                bootstrap:  function(module, script) {
                  return "angular.module('"+pkg.name+"').run(['$templateCache', function($templateCache) {" 
                      + script + "}]);";
                }
              }
            }
        },
        ngAnnotate: {
            app: {
                files: [
                    {
                        expand: true,
                        src: ['<%= pkg.outDir %>/build/app.js'],
                        ext: '.annotate.js'
                    }
                ]
            }
        },        
        jasmine: {
          app: {
            src: '<%= pkg.outDir %>/dist/app.js',
            options: {
              specs: 'spec/**/*Spec.js',
              helpers: 'spec/**/*Helper.js',
              vendor: [
                  './node_modules/angular/angular.js',    
                  './node_modules/angular-mocks/angular-mocks.js',
                  '<%= pkg.outDir %>/build/app.js',
                  '<%= pkg.outDir %>/build/templates.js'
              ]
            }
          }
        },
        uglify: {
            app: {
              files: {
                '<%= pkg.outDir %>/dist/app.js': [
                  '<%= pkg.outDir %>/build/app.annotate.js',
                  '<%= pkg.outDir %>/build/templates.js'
                ]
              }
            },
            vendor: {
              files: {
                '<%= pkg.outDir %>/dist/vendor.js': [
                    'node_modules/angular/angular.min.js',
                    'node_modules/highcharts/highcharts.js'
                ]
              }
            }
        },
        watch: {
          scripts: {
            files: jsFiles,
            tasks: ['concat', 'jasmine']
          },
          templates: {
            files: ['<%= pkg.srcDir %>/**/*.html'],
            tasks: ['ngtemplates', 'jasmine']
          },
          tests: {
            files: 'spec/**/*.js',
            tasks: ['jasmine']
          }
        }
    });
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
};
