var config = module.exports;

config['EMR pig runner tests'] = {
    environment: 'node',
    rootPath: '../',
    tests: [
        'test/**/*-test.js'
    ],
    // buster-istanbul setup
    'buster-istanbul': {
        outputDirectory: 'coverage',
        format: 'lcov'
    },
    sources: [
        'lib/**/*.js',
        '!Gruntfile.js',
        '!index.js',
        '!run.js'
    ],
    extensions: [
        require('buster-istanbul')
    ]
};
