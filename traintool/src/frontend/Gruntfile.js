/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt) {

  grunt.initConfig({

       // A simple ordered concatenation strategy. This will start at
       // app/app.js and begin adding dependencies in the correct order
       // writing their string contents into 'build/application.js'

       // Additionally it will wrap them in evals with @ sourceURL
       // statements so errors, log statements and debugging will
       // reference the source files by line number.

       // You would set this option to false for  production.

    neuter: {
      options: {
        includeSourceURL: true
      },
      'build/assets/js/application.js': 'app/app.js'
    },

    uglify: {
      application: {
        files: {
          'build/assets/js/built.min.js': ['dependencies/bower_components/handlebars/handlebars.runtime.js','build/assets/js/application.js', 'dependencies/assets/js/*.js', 'dependencies/bower_components/bootstrap/dist/js/bootstrap.js']
        }
      }
    },

      // Compile the sass files and generate the CSS.

    compass: {
      dist: {
        options: {
          sassDir:"dependencies/assets/sass/",
          cssDir:"dependencies/assets/css/"
        }
      }
    },

    concat: {
      css: {
        src: ['dependencies/bower_components/bootstrap/dist/css/bootstrap.css', 'dependencies/assets/css/*.css'],
        dest: 'build/assets/css/stylesheet.css'
      }
    },

      //Minify and concatenate the css files

    cssmin: {
      minify: {
        src: 'build/assets/css/stylesheet.css',
        dest: 'build/assets/css/stylesheet.min.css'
      }
    },

    imagemin: {
      dynamic: {                         
        files: [{
          expand: true,                  
          cwd: 'dependencies/assets/imgs',                   
          src: ['*.{png,jpg,gif}'],  
          dest: 'build/assets/imgs'             
        }]
      }
    },

    svgmin: {
      options: {                                      // Configuration that will be passed directly to SVGO
          plugins: [
            { removeViewBox: false },
            { removeUselessStrokeAndFill: false }
          ]
      },
      dist: {                                         // Target
        files: [{
          expand: true,                  
          cwd: 'dependencies/assets/imgs',                   
          src: ['*.svg'],  
          dest: 'build/assets/imgs'             
        }]
      }
    },

      // Watch files for changes.

      // Changes in dependencies/ember.js or application javascript will
      // trigger the neuter task.

      // Changes to any templates will trigger the emberTemplates task
      // (which writes a new compiled file into dependencies/) and then
      // neuter all the files again.

    watch: {
      application_code: {
        files: [
          'app/**/*.js',
        ],
        tasks: ['neuter', 'uglify'],
        options:{
          livereload:true
        }
      },
      handlebars_templates: {
        files: ['app/**/*.hbs'],
        tasks: ['emberTemplates', 'neuter', 'uglify'],
        options:{
          livereload:true
        }
      },
      sass: {
        files: ['dependencies/assets/sass/*.scss'],
        tasks: ['compass']
      },
      css: {
        files:['dependencies/assets/css/*.css'],
        tasks: ['concat', 'cssmin'],
        options:{
          livereload:true
        }
      },
      imagemin: {
        files:['dependencies/assets/imgs/*.img'],
        tasks: ['imagemin'],
        options:{
          livereload:true
        }
      }
    },


      // Runs all .html files found in the test/ directory through
      // PhantomJS. Prints the report in your terminal.

    qunit: {
      all: ['test/**/*.html']
    },


      // Reads the projects .jshintrc file and applies coding standards.
      // Doesn't lint the dependencies or test support files.

    jshint: {
      all: [
        'Gruntfile.js',
        'app/**/*.js',
        'test/**/*.js',
        '!dependencies/*.*',
        '!test/support/*.*'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },


      // Finds Handlebars templates and precompiles them into functions.
      // The provides two benefits:

      // 1. Templates render much faster 2. We only need to include the
      // handlebars-runtime microlib    and not the entire Handlebars
      // parser.

      // Files will be written out to dependencies/compiled/templates.js
      // which is required within the project files so will end up as
      // part of our application.

      // The compiled result will be stored in Ember.TEMPLATES keyed on
      // their file path (with the 'app/templates' stripped)

    emberTemplates: {
      options: {
        templateName: function(sourceFile) {
          return sourceFile.replace(/app\/templates\//, '');
        }
      },
      'dependencies/compiled/templates.js': ["app/templates/**/*.hbs"]
    },

      // Find all the <whatever>_test.js files in the test folder. These
      // will get loaded via script tags when the task is run. This gets
      // run as part of the larger 'test' task registered below.

    build_test_runner_file: {
      all: ['test/**/*_test.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-svgmin');


    // A task to build the test runner html file that get place in /test
    // so it will be picked up by the qunit task. Will place a single
    // <script> tag into the body for every file passed to its
    // coniguration above in the grunt.initConfig above.

  grunt.registerMultiTask('build_test_runner_file',
                          'Creates a test runner file.', function(){
    var tmpl = grunt.file.read('test/support/runner.html.tmpl');
    var renderingContext = {
      data: {
        files: this.filesSrc.map(function(fileSrc){
          return fileSrc.replace('test/', '');
        })
      }
    };
    grunt.file.write('test/runner.html',
                     grunt.template.process(tmpl, renderingContext));
  });


    // A task to run the application's unit tests via the command line.
    //  It will:
    // - convert all the handlebars templates into compile functions
    // - combine these files + application files in order
    // - lint the result
    // - build an html file with a script tag for each test file
    // - headlessy load this page and print the test runner results

  grunt.registerTask('test', ['emberTemplates', 'neuter', 'newer:uglify:application', 'jshint',
                              'compass', 'concat', 'cssmin', 'build_test_runner_file', 'qunit']);


  grunt.registerTask('compile',
                     ['emberTemplates', 'neuter', 'newer:uglify:application', 'imagemin', 'svgmin', 'compass', 'concat', 'cssmin']);

    // Default task. Compiles templates, neuters application code, and
    // begins watching for changes.

  grunt.registerTask('default', ['emberTemplates', 'neuter', 'newer:uglify:application', 'imagemin', 'svgmin', 'compass', 'concat', 'cssmin',
                                 'watch']);
};
