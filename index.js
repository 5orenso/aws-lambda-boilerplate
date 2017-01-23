'use strict';
/**
 * @fileOverview Lambda handler API Gateway requests.
 * @name Lambda handler
 */

/**
 * Lambda handler.
 * @param {object} event - Object passed on from AWS Lambda.
 * @param {object} context - Object passed on from AWS Lambda.
 * @param {function} callback - Should be called when done..
 */
exports.handler = function(event, context, callback) {
    // console.log('Received event:', JSON.stringify(event, null, 2));
    const done = (err, res) => callback(null, {
        statusCode: err ? 400 : 200,
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    switch (event.httpMethod) {
        case 'GET':
            done(null, event.queryStringParameters);
            break;
        case 'POST':
            done(null, JSON.parse(event.body));
            break;
        case 'PUT':
            done(null, JSON.parse(event.body));
            break;
        case 'PATCH':
            done(null, JSON.parse(event.body));
            break;
        case 'DELETE':
            done(null, JSON.parse(event.body));
            break;
        case 'COPY':
            done(null, JSON.parse(event.body));
            break;
        case 'HEAD':
            done(null, {});
            break;
        case 'OPTIONS':
            done(null, JSON.parse(event.body));
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }

};

