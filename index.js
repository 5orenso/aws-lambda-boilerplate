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
exports.handler = async (event) => {
    // console.log('Received event:', JSON.stringify(event, null, 2));
    const done = (err, res) => ({
        statusCode: err ? 400 : 200,
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {
        case 'GET':
            return done(null, event.queryStringParameters);
        case 'POST':
            return done(null, JSON.parse(event.body));
        case 'PUT':
            return done(null, JSON.parse(event.body));
        case 'PATCH':
            return done(null, JSON.parse(event.body));
        case 'DELETE':
            return done(null, JSON.parse(event.body));
        case 'COPY':
            return done(null, JSON.parse(event.body));
        case 'HEAD':
            return done(null, {});
        case 'OPTIONS':
            return done(null, JSON.parse(event.body));
        default:
            return done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
