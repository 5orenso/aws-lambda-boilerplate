'use strict';

var myAWS = require('./lib/myaws'),
    bucket = '',
    key = '';

exports.handler = (event, context, callback) => {
    myAWS.s3GetObject(bucket, key)
        .then(function (result) {
            callback(null, result);
        })
        .catch(function (error) {
            callback(error);
        });
};

