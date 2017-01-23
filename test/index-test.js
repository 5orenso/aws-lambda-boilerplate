'use strict';

let buster  = require('buster'),
    assert  = buster.assert;

let index = require('../index.js');

// var AWS = require('aws-sdk-mock');
// AWS.mock('S3', 'getObject', function (params, callback) {
//     if (params.Bucket === 'boom') {
//         callback('BOOM!');
//     }
//     callback(undefined, myFile);
// });

// jscs:disable
const apiGwLambdaRequest = {
    "resource": "/hello-world",
    "path": "/hello-world/",
    "httpMethod": "GET",
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, sdch, br",
        "Accept-Language": "en-US,en;q=0.8,da;q=0.6,nb;q=0.4,sv;q=0.2",
        "Cache-Control": "no-cache",
        "CloudFront-Forwarded-Proto": "https",
        "CloudFront-Is-Desktop-Viewer": "true",
        "CloudFront-Is-Mobile-Viewer": "false",
        "CloudFront-Is-SmartTV-Viewer": "false",
        "CloudFront-Is-Tablet-Viewer": "false",
        "CloudFront-Viewer-Country": "NO",
        "Content-Type": "text/plain",
        "DNT": "1",
        "Host": "my-api-id.execute-api.eu-west-1.amazonaws.com",
        "Postman-Token": "711128bf-f39a-34bc-b86f-5e482365e02b",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36",
        "Via": "1.1 asdf9sdf9sadf9asdf9asdf9asdf9sadf9asdf9.cloudfront.net (CloudFront)",
        "X-Amz-Cf-Id": "asdlkfjasdfasdfasdfasdfAsdfASDFASDFasdfasdfasdfasdfasdf==",
        "X-Forwarded-For": "127.0.0.1, 10.0.0.1",
        "X-Forwarded-Port": "443",
        "X-Forwarded-Proto": "https"
    },
    "queryStringParameters": {
        "q": "test"
    },
    "pathParameters": null,
    "stageVariables": null,
    "requestContext": {
        "accountId": "100000000000",
        "resourceId": "aaaabbbb",
        "stage": "dev",
        "requestId": "asdfasdf-asdfasdfasdf-asdfadsfasdf-asdfasdf",
        "identity": {
            "cognitoIdentityPoolId": null,
            "accountId": null,
            "cognitoIdentityId": null,
            "caller": null,
            "apiKey": null,
            "sourceIp": "127.0.0.1",
            "accessKey": null,
            "cognitoAuthenticationType": null,
            "cognitoAuthenticationProvider": null,
            "userArn": null,
            "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36",
            "user": null
        },
        "resourcePath": "/hello-world",
        "httpMethod": "GET",
        "apiId": "my-api-id"
    },
    "body": null,
    "isBase64Encoded": false
};

const apiGwLambdaResponse = {
    statusCode: 200,
    body: '{"q":"test"}',
    headers: { 'Content-Type': 'application/json' }
};

const apiGwLambdaBadRequstResponse = {
    body: 'Unsupported method "BADREQUEST"',
    headers: { 'Content-Type': 'application/json' },
    statusCode: 400
};
// jscs:enable

buster.testCase('index.js lambda handler', {
    setUp: function () {
        this.timeout = 2000;
    },
    tearDown: function () {
    },
    'GET test cases': {
        'Should return querystring input in the correct format': (done) => {
            index.handler(apiGwLambdaRequest, undefined, (error, result) => {
                assert.equals(result, apiGwLambdaResponse);
                done();
            });
        }
    },
    'POST test cases': {
        'Should return querystring input in the correct format': (done) => {
            const request = Object.assign({}, apiGwLambdaRequest, {
                httpMethod: 'POST',
                requestContext: {
                    httpMethod: 'POST'
                },
                body: '{"q":"test"}',
                queryStringParameters: {}
            });
            index.handler(request, undefined, (error, result) => {
                assert.equals(result, apiGwLambdaResponse);
                done();
            });
        }
    },
    'PUT test cases': {
        'Should return querystring input in the correct format': (done) => {
            const request = Object.assign({}, apiGwLambdaRequest, {
                httpMethod: 'PUT',
                requestContext: {
                    httpMethod: 'PUT'
                },
                body: '{"q":"test"}',
                queryStringParameters: {}
            });
            index.handler(request, undefined, (error, result) => {
                assert.equals(result, apiGwLambdaResponse);
                done();
            });
        }
    },
    'PATCH test cases': {
        'Should return querystring input in the correct format': (done) => {
            const request = Object.assign({}, apiGwLambdaRequest, {
                httpMethod: 'PATCH',
                requestContext: {
                    httpMethod: 'PATCH'
                },
                body: '{"q":"test"}',
                queryStringParameters: {}
            });
            index.handler(request, undefined, (error, result) => {
                assert.equals(result, apiGwLambdaResponse);
                done();
            });
        }
    },

    'DELETE test cases': {
        'Should return querystring input in the correct format': (done) => {
            const request = Object.assign({}, apiGwLambdaRequest, {
                httpMethod: 'DELETE',
                requestContext: {
                    httpMethod: 'DELETE'
                },
                body: '{"q":"test"}',
                queryStringParameters: {}
            });
            index.handler(request, undefined, (error, result) => {
                assert.equals(result, apiGwLambdaResponse);
                done();
            });
        }
    },
    'COPY test cases': {
        'Should return querystring input in the correct format': (done) => {
            const request = Object.assign({}, apiGwLambdaRequest, {
                httpMethod: 'COPY',
                requestContext: {
                    httpMethod: 'COPY'
                },
                body: '{"q":"test"}',
                queryStringParameters: {}
            });
            index.handler(request, undefined, (error, result) => {
                assert.equals(result, apiGwLambdaResponse);
                done();
            });
        }
    },
    'HEAD test cases': {
        'Should return querystring input in the correct format': (done) => {
            const request = Object.assign({}, apiGwLambdaRequest, {
                httpMethod: 'HEAD',
                requestContext: {
                    httpMethod: 'HEAD'
                }
            });
            const response = Object.assign({}, apiGwLambdaResponse, {
                body: '{}'
            });
            index.handler(request, undefined, (error, result) => {
                assert.equals(result, response);
                done();
            });
        }
    },
    'OPTIONS test cases': {
        'Should return querystring input in the correct format': (done) => {
            const request = Object.assign({}, apiGwLambdaRequest, {
                httpMethod: 'OPTIONS',
                requestContext: {
                    httpMethod: 'OPTIONS'
                },
                body: '{"q":"test"}',
                queryStringParameters: {}
            });
            index.handler(request, undefined, (error, result) => {
                assert.equals(result, apiGwLambdaResponse);
                done();
            });
        }
    },
    'BADREQUEST test cases': {
        'Should return querystring input in the correct format': (done) => {
            const request = Object.assign({}, apiGwLambdaRequest, {
                httpMethod: 'BADREQUEST',
                requestContext: {
                    httpMethod: 'BADREQUEST'
                },
                body: '{"q":"test"}',
                queryStringParameters: {}
            });
            index.handler(request, undefined, (error, result) => {
                assert.equals(result, apiGwLambdaBadRequstResponse);
                done();
            });
        }
    }
});
