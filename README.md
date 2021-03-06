# A nice boilerplate for a new AWS Lambda function

[![Build Status](https://travis-ci.org/5orenso/aws-lambda-boilerplate.svg?branch=master)](https://travis-ci.org/5orenso/aws-lambda-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/5orenso/aws-lambda-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/5orenso/aws-lambda-boilerplate?branch=master)

A good start for an AWS Lambda function. If you combine this with the [aws-lambda-autodeploy-lambda](https://github.com/5orenso/aws-lambda-autodeploy-lambda) you will have a very fast deployment process. When you push code to Github.com it will only take a couple of minutes to run all your test, deploy you code to S3 and refresh the Lambda function. All automatic while you're drinking a fresh cup of newly brewed coffee.

__Features:__
* Boilerplate for [AWS Lamda](https://aws.amazon.com/lambda/) functions.
* Automated unit tests with [NPM](https://www.npmjs.com/) and [Jest](https://jestjs.io/).
* Code coverage with [Jest](https://jestjs.io/).
* Code style and hits with [ESLint](https://eslint.org/).
* CI integration with [Travis](https://travis-ci.org/).
* And last but not least; deployment with [AWS CloudFormation](https://aws.amazon.com/cloudformation/)


## Getting started with development

```
$ git clone
$ npm install
$ cp ./bin/set-env-dist.sh ./bin/set-env.sh
$ . ./bin/set-env.sh
$ npm run test:watch
```


### Run all tests

```bash
$ npm test
```


### Lint all of the relevant code

```bash
$ npm run lint
```


### Build a new release

```bash
$ npm run build
```


### Report coverage to Coveralls.io

```bash
$ npm run coverage
```


### Update changelog

```bash
$ bash ./changelog.sh
```


## Travis and Coveralls setup

To get auto coveralls reporting working you need to add your encrypted Coveralls token in `.travis.yml`.

This is how you do it:
```bash
$ travis encrypt COVERALLS_REPO_TOKEN=<super_secret coveralls token> --add env.global
```


### Steps for preparing your repo:

1. Connect your Github.com repo to your Travis CI account. https://travis-ci.org/
2. Add `AWS_ACCESS_KEY` and `AWS_SECRET_KEY` to your Travis CI environment.
3. Edit `.travis.yml` to match your `bucket`, `upload-dir` and `region`.
4. Copy `.coveralls-dist.yml` to `.coveralls.yml` and add you secret key.


Next time you push to your master brach Travis will run your tests and if all is green report coverage to Coveralls.

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

* [AWS Basic setup with Cloudformation](https://github.com/5orenso/aws-cloudformation-base)
* [AWS Lambda boilerplate](https://github.com/5orenso/aws-lambda-boilerplate)
* [Automated AWS Lambda update](https://github.com/5orenso/aws-lambda-autodeploy-lambda)
* [AWS API Gateway setup with Cloudformation](https://github.com/5orenso/aws-cloudformation-api-gateway)
* [AWS IoT setup with Cloudformation](https://github.com/5orenso/aws-cloudformation-iot)
