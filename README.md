# aws-lambda-boilerplate
[![Build Status](https://travis-ci.org/5orenso/aws-lambda-boilerplate.svg?branch=master)](https://travis-ci.org/5orenso/aws-lambda-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/5orenso/aws-lambda-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/5orenso/aws-lambda-boilerplate?branch=master)

A good start for a AWS Lambda function with auto deployment to S3.

Features:
* Boilerplate for Lamda function
* Automated unit tests with Grunt and Buster.js
* CI integration with Travis.
* Automated deployment to S3 with Travis.


## Getting started with development
```
$ git clone
$ npm install
$ grunt watch
```

## Travis setup
To get auto deployment to S3 working you need to integrate with Travis CI.

### Steps
1. Connect your Github.com repo to your Travis CI account. 
2. Add `AWS_ACCESS_KEY` and `AWS_SECRET_KEY` to your Travis CI environment. 
3. Edit `.travis.yml` to match your `bucket`, `upload-dir` and `region`.

Next time you push to your master brach Travis will run your tests and if all is green deploy the code to your S3 bucket.

Isn't this great? :D
