'use strict';

var buster  = require('buster'),
    assert  = buster.assert;

var myFile = 'Hello World!';

var AWS = require('aws-sdk-mock');
AWS.mock('S3', 'getObject', function (params, callback) {
    if (params.Bucket === 'boom') {
        callback('BOOM!');
    }
    callback(undefined, myFile);
});

var myAws = require('../../lib/myaws');

buster.testCase('Test aws module', {
    setUp: function () {
        this.timeout = 2000;
    },
    tearDown: function () {
    },
    'test cases': {
        'getObject should resolve with file content': function (done) {
            myAws.s3GetObject('my-bucket', 'my-key')
                .then(function (result) {
                    console.log(result);
                    assert.equals(result, myFile);
                    done();
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        'getObject should blow up': function (done) {
            myAws.s3GetObject('boom', 'my-key')
                .then(function (result) {
                    console.log(result);
                })
                .catch(function (error) {
                    assert.equals(error, 'BOOM!');
                    done();
                });
        }
    }
});
