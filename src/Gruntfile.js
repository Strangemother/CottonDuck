module.exports = function(grunt) {

grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    filename: '<%= pkg.filename %>-<%= pkg.version %>'

    , copy: {
        main: {
            files: [
                {
                    expand: true
                    , cwd: 'src/cotton/vendor/required/'
                    , src: ['**']
                    , dest: '../dist/vendor/'
                }
            ]
        },
    }

    , concat: {

        options: {
            separator: ';'
        }

        , spindle: {
            src: [
                'spindle/spindle.js'
                , 'spindle/spindle-plugin.js'
            ]
            , dest: '../dist/uncompressed/spindle.js'
        }

        , cottonCanvas: {
            src: [
                '<%= concat.spindle.src =>'
                , 'cotton/cotton.js'
                , 'cotton/components/cotton.canvas.js'
            ]
            , dest: '../dist/uncompressed/cotton-canvas.js'
        }

        , vendor: {
            src: [
                'cotton/vendor/it.js'
                , 'cotton/vendor/ljs/l.js'
            ]
            , dest: '../dist/uncompressed/vendor.js'
        }


    }

    , uglify: {
        options: {
            banner: '/*! <%= filename %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        }

        , dist: {
            files: {
                '../dist/min/spindle.min.js': [
                    '<%= concat.vendor.dest %>'
                    , '<%= concat.spindle.dest %>'
                ]
                , '../dist/min/cotton-canvas.min.js': [
                    '<%= concat.vendor.dest %>'
                    , '<%= concat.spindle.dest %>'
                    , '<%= concat.cottonCanvas.dest %>'
                ]
            }
        }

    }

    , qunit: {
        all: ['test/**/*.html']
    }

    , jshint: {
        files: [
            'src/cotton/duck/**/*.js'
            , 'src/cotton/cotton/**/*.js'
            , 'src/cotton/tests/**/*.js'
            , 'src/cotton/*.js'
            , 'test/**/*.js'],
        options: {
            // options here to override JSHint defaults
            globals: {
                jQuery: true,
                console: true,
                module: true,
                document: true,
                // reporter: require('jshint-stylish')
            }
        },
    }

    , docco: {
        debug: {
            src: [
                'src/cotton/cotton/**/*'
                , 'src/cotton/duck/**/*'
                , 'src/cotton/*'
                ],
            options: {
                output: 'docs/autodocs/'
            }
        }
    }

    , watch: {
        files: ['<%= jshint.files %>', 'Gruntfile.js'],
        tasks: ['qunit']
    }
});

grunt.loadNpmTasks('grunt-contrib-copy');
// grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
// grunt.loadNpmTasks('grunt-contrib-qunit');
// grunt.loadNpmTasks('grunt-contrib-qunit');
// grunt.loadNpmTasks('grunt-contrib-watch');

// grunt.registerTask('test', ['qunit', 'docco']);
grunt.registerTask('default', ['copy', 'concat']);
grunt.registerTask('build', ['copy', 'concat', 'uglify']);
grunt.registerTask('deploy', ['build']);
};
