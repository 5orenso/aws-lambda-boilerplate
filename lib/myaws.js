'use strict';

var AWS = require('aws-sdk');

function s3GetObject(bucket, key) {
    let s3 = new AWS.S3({region: 'eu-west-1'});
    return new Promise(function (resolve, reject) {
        let params = {
            Bucket: bucket,
            Key: key
        };
        s3.getObject(params, function(error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = {
    s3GetObject: s3GetObject
};
