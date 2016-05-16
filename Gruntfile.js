'use strict';

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        latestTag: 'emr-pig-runner',
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                src: ['*.js', 'lib/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            }
        },
        jscs: {
            main: ['*.js', 'test/**/*.js', 'lib/**/*.js'],
            options: {
                config: '.jscsrc'
            }
        },
        watch: {
            all: {
                files: ['test/**/*.js', '*.js', 'lib/**/*.js'],
                tasks: ['lint', 'buster:unit']
            }
        },
        buster: {
            unit: {}
        },
        nodemon: {
            dev: {
                options: {
                    // nodeArgs: ['--debug'],
                    file: 'index.js',
                    args: ['-c', '../config/config-dist.js']
                },
                tasks: ['buster:unit']
            }
        },
        shell: {
            multiple: {
                command: [
                    'mkdir -p dist',
                    'mv ./node_modules ./node_modules2',
                    'npm install --production',
                    'zip -FSr  dist/<%= latestTag %>.zip ./ ' +
                    '-x "*dist*" "*.md" "*.DS_Store" "*.sh" "*test*" "package.json" "Gruntfile.js" ' +
                    '"*node_modules2*" "*coverage/*" ".js*"',
                    'rm -rf node_modules',
                    'mv ./node_modules2 ./node_modules',
                    'echo ""',
                    'echo TODO:',
                    'echo s3cmd put dist/<%= latestTag %>.zip s3://tsn-insight-lambda-functions/'
                ].join('&&')
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-buster');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-coveralls');

    // Default task.
    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('default', ['lint', 'buster:unit']);
    grunt.registerTask('test', 'buster:unit');
    grunt.registerTask('check', ['watch']);
    grunt.registerTask('run', ['buster:unit', 'nodemon:dev']);
    grunt.registerTask('artifact', ['shell']);
    grunt.registerTask('build', ['artifact']);
};
