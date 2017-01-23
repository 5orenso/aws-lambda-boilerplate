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
        '*.js',
        '!Gruntfile.js'
    ],
    extensions: [
        require('buster-istanbul')
    ]
};
