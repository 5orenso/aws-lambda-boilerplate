# A nice boilerplate for a new AWS Lambda function

[![Build Status](https://travis-ci.org/5orenso/aws-lambda-boilerplate.svg?branch=master)](https://travis-ci.org/5orenso/aws-lambda-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/5orenso/aws-lambda-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/5orenso/aws-lambda-boilerplate?branch=master)

A good start for an AWS Lambda function with automated deployment to S3 when pushed to Github.com. If you combine this with the [aws-lambda-autodeploy-lambda](https://github.com/5orenso/aws-lambda-autodeploy-lambda) you will have a very fast deployment process. When you push code to Github.com it will only take a couple of minutes to run all your test, deploy you code to S3 and refresh the Lambda function. All automatic while you're drinking a fresh cup of newly brewed coffee.

__Features:__
* Boilerplate for [AWS Lamda](https://aws.amazon.com/lambda/) functions.
* Automated unit tests with [Grunt](http://gruntjs.com/) and [Buster.js](http://docs.busterjs.org/en/latest/).
* Code coverage with [Istanbul](https://istanbul.js.org/) and reports to [Coveralls.io](https://coveralls.io/)
* Code style and hits with [JSCS](http://jscs.info/) and [JSHint](http://jshint.com/).
* CI integration with [Travis](https://travis-ci.org/).
* Automated deployment to [AWS S3](https://aws.amazon.com/s3/) with Travis.
* And last but not least; deployment with [AWS CloudFormation](https://aws.amazon.com/cloudformation/)


## Getting started with development

```
$ git clone
$ npm install
$ cp ./bin/set-env-dist.sh ./bin/set-env.sh
$ . ./bin/set-env.sh
$ grunt watch
```


### Build a new release

```bash
# Build file:
$ grunt build
```


## Travis and Coveralls setup

To get auto deployment to S3 working you need to integrate with Travis CI and Coveralls.io.


### Steps for preparing your repo:

1. Connect your Github.com repo to your Travis CI account. https://travis-ci.org/
2. Add `AWS_ACCESS_KEY` and `AWS_SECRET_KEY` to your Travis CI environment.
3. Edit `.travis.yml` to match your `bucket`, `upload-dir` and `region`.
4. Copy `.coveralls-dist.yml` to `.coveralls.yml` and add you secret key.


Next time you push to your master brach Travis will run your tests and if all is green deploy the code to your S3 bucket.

Isn't this great? :D


### CloudFormation

```bash
# To create a new stack:
$ bash ./bin/create-stack.sh

# To update a current stack:
$ bash ./bin/create-stack.sh -u
```


### Howto check for vulnerabilities in modules

```bash
# Install Node Security Platform CLI
$ npm install nsp --global  

# From inside your project directory
$ nsp check  
```


### Howto upgrade modules

```bash
$ npm install -g npm-check-updates
$ ncu -u
$ npm install --save --no-optional
```


## Other Resources

* [AWS Lambda boilerplate](https://github.com/5orenso/aws-lambda-boilerplate)
* [Automated AWS Lambda update](https://github.com/5orenso/aws-lambda-autodeploy-lambda)
* [API Gateway setup with Cloudformation](https://github.com/5orenso/aws-cloudformation-api-gateway)
