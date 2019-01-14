const config = module.exports;

config['AWS Lambda'] = {
    environment: 'node',
    rootPath: '../',
    tests: [
        'test/**/*-test.js',
    ],
    'buster-istanbul': {
        outputDirectory: 'coverage',
        format: 'lcov',
    },
    sources: [
        '*.js',
        '!Gruntfile.js',
    ],
    extensions: [
        require('buster-istanbul'), // eslint-disable-line
    ],
};
