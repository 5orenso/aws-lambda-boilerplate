'use strict';

module.exports = function gruntConfig(grunt) {
    require('time-grunt')(grunt); // eslint-disable-line
    let currentBranchName = (process.env.TRAVIS_PULL_REQUEST_BRANCH === '' ?
        process.env.TRAVIS_BRANCH : process.env.TRAVIS_PULL_REQUEST_BRANCH);
    if (currentBranchName === 'master' || currentBranchName == null) {
        currentBranchName = '';
    } else {
        currentBranchName = `-${currentBranchName}`;
    }
    // Project configuration.
    grunt.initConfig({
        currentBranch: currentBranchName,
        packetName: 'aws-lambda-boilerplate',
        staticLambdaBucket: 'my-lambda-deploy-test-bucket',
        autoLambdaBucket: 'my-lambda-autodeploy-lambda-bucket',
        pkg: grunt.file.readJSON('package.json'),
        eslint: {
            options: {
                config: '.eslintrc.json',
                reset: true,
            },
            target: ['*.js', 'test/**/*.js', 'lib/**/*.js'],
        },
        watch: {
            all: {
                files: ['test/**/*.js', '*.js', 'lib/**/*.js'],
                tasks: ['lint', 'buster:unit'],
            },
        },
        buster: {
            unit: {},
        },
        shell: {
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
                    'echo "First time: Upload the zip file to S3 to be able to run it from Lambda."',
                    'echo "$ aws s3 cp dist/<%= packetName %><%= currentBranch %>.zip s3://<%= staticLambdaBucket %>/'
                        + '<%= packetName %><%= currentBranch %>.zip"',
                    'echo ""',
                    'echo "Next time: Upload the zip file to S3 to have the Lambda function automatically updated."',
                    'echo "$ aws s3 cp dist/<%= packetName %><%= currentBranch %>.zip s3://<%= autoLambdaBucket %>/'
                        + '<%= packetName %><%= currentBranch %>.zip"',
                ].join('&&'),
            },
        },
        coveralls: {
            realCoverage: {
                src: 'coverage/lcov.info',
            },
        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-buster');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-eslint');

    // Default task.
    grunt.registerTask('es', ['eslint']);
    grunt.registerTask('lint', ['eslint']);
    grunt.registerTask('default', ['lint', 'buster:unit', 'coveralls:realCoverage']);
    grunt.registerTask('coverage', ['coveralls:realCoverage']);
    grunt.registerTask('test', 'buster:unit');
    grunt.registerTask('check', ['watch']);
    grunt.registerTask('artifact', ['shell']);
    grunt.registerTask('build', ['artifact']);
};
