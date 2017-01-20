'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        packetName: 'aws-lambda-boilerplate',
        staticLambdaBucket: 'my-lambda-deploy-test-bucket',
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
        shell: {
            // jscs:disable
            getCurrentBranch: {
                command: 'git symbolic-ref --short HEAD',
                options: {
                    callback: function (err, stdout, stderr, cb) {
                        stdout = stdout.trim();
                        // If we have a leading 'v' in the version, remove it
                        if (stdout !== 'master') {
                            grunt.config.set('currentBranch', '-' + stdout);
                        }
                        console.log('Current branch: ', stdout);
                        cb();
                    }
                }
            },
            multiple: {
                command: [
                    'mkdir -p dist',
                    'mv ./node_modules ./node_modules2',
                    'npm install --production',
                    'zip -FSr  dist/<%= packetName %><%= currentBranch %>.zip ./ ' +
                        '-x "*dist*" "bin/*" ".git*" "*.md" "*.DS_Store" "*.sh" "*test*" ' +
                        '"package.json" "Gruntfile.js" ' +
                        '"*node_modules2*" "*coverage/*" ".js*" "*doc/*"',
                    'rm -rf node_modules',
                    'mv ./node_modules2 ./node_modules',
                    'echo ""',
                    'echo "TODO:"',
                    'echo "Upload the zip file to S3 to be able to run it from Lambda."',
                    'echo "$ aws s3 cp dist/<%= packetName %><%= currentBranch %>.zip s3://<%= staticLambdaBucket %>/<%= packetName %><%= currentBranch %>.zip"'
                ].join('&&')
            }
            // jscs:enable
        },
        coveralls: {
            realCoverage: {
                src: 'coverage/lcov.info'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-buster');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-coveralls');

    // Default task.
    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('default', ['lint', 'buster:unit', 'coveralls:realCoverage']);
    grunt.registerTask('coverage', ['coveralls:realCoverage']);
    grunt.registerTask('test', 'buster:unit');
    grunt.registerTask('check', ['watch']);
    grunt.registerTask('artifact', ['shell']);
    grunt.registerTask('build', ['artifact']);
};
