module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-touch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        concat: {
          dist: {
            src: ['libs/phaser.js', 'tmp/pilasengine.js', 'libs/TweenMax.js'],
            dest: '../public/libs/pilasengine.js',
          },
          map: {
            src: ['tmp/pilasengine.d.ts'],
            dest: '../public/libs/pilasengine.d.ts',
          }
        },
        typedoc: {
            build: {
                options: {
                    module: 'commonjs',
                    out: './docs/dist',
                    name: 'pilasengine.js',
                    target: 'es5',
                    readme: './docs/homepage.md'
                },
                src: ['./src/**/*', 'public/data/**/*']
            }
        },
        pkg: grunt.file.readJSON('package.json'),
	      touch: {
	        src: ['../app/index.html']
	      },
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'tmp/pilasengine.js',
                options: {
                    module: 'CommonJS',
                    removeComments: false,
                    target: 'es5',
                    declaration: true,
                    sourceMap: false
                }
            }
        },
        watch: {
          simple: {
            options: {
              livereload: true,
              spawn: false,
            },
            files: ['src/**/*.ts'],
            tasks: ['typescript', 'concat', 'touch']
          },
        },
    });


    function show_message(message, url) {
      var color = "\x1b[32m";
      var color2 = "\x1b[33m";
      var msg =  "*** " + message;

      console.log(color, msg, color2, url, color, "***");
    }

    function drawLine() {
      var reset = "\x1b[0m";
      var color = "\x1b[32m";
      var line = "*".repeat(83);
      console.log(color, line);
    }

    function clear() {
      var reset = "\x1b[0m";
      console.log(reset, "");
    }

    grunt.registerTask('message', 'Muestra que url se tiene que abrir.', function(arg) {
      clear();
      drawLine();

      show_message("Para ejemplos, arir desde ember con:   ", "http://localhost:4200/#/examples");

      drawLine();
      clear();
    });

    grunt.loadNpmTasks('grunt-typedoc');
    grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.registerTask('compilar-con-ejemplos-livereload', ['typescript', 'watch:simple']);
    grunt.registerTask('compilar', ['typescript', 'concat', 'touch']);
}
