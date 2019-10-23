#!/bin/bash

set -e;

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
    DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

if [ -f $DIR/set-env.sh ]; then
    . $DIR/set-env.sh
fi

STACK_NAME=${LAMBDA_FUNCTION_NAME:-'aws-lambda-boilerplate'}

# Read command line input:
while [[ $# > 0 ]]; do
    key="$1"
    case $key in
        -h|--help)
            HELP="true"
        ;;
        -r|--aws-region)
            AWS_REGION="$2"
            shift # past argument
        ;;
        -p|--aws-profile)
            AWS_PROFILE="$2"
            shift # past argument
        ;;
        -t|--template)
            CLOUDFORMATION_TEMPLATE="$2"
            shift # past argument
        ;;
        -u|--update-stack)
            UPDATE_STACK="true"
        ;;
        *)
            # unknown option
        ;;
    esac
    shift # past argument or value
done

STACK_ACTION="create-stack"
if [ ! -z "$UPDATE_STACK" ]; then
    STACK_ACTION="update-stack"
fi
if [ ! -z "$AWS_PROFILE" ]; then
    AWS_PROFILE="--profile ${AWS_PROFILE}"
fi
AWS_REGION=${AWS_REGION:-'eu-west-1'}

CLOUDFORMATION_TEMPLATE=${CLOUDFORMATION_TEMPLATE:-'default-template.json'}

if [ ! -z "$HELP" ]; then
    echo "bash ${0} - help"
    echo "    [-h|--help]"
    echo "    [-u|--update-stack]"
    echo "    [-t|--template <cloudformation template>]"
    echo "    [-r|--aws-region <aws region>]"
    echo "    [-p|--aws-profile <aws profile>]"
    echo ""
    echo "This script will create or update your cloudformation stack. All actions can be "
    echo "found in the cloudformation/template.json file in this repository."
    echo ""
    echo "Update the bin/set-env.sh script with your slack and s3 settings."
    echo "See bin/set-env-dist.sh for an example."
    echo ""
    echo "Typical steps to run before you create a new stack:"
    echo "     $ cp ./set-env-dist.sh ./set-env.sh"
    echo "     $ vim ./set-env.sh"
    echo "     $ . ./set-env.sh"
    echo "     $ aws s3api create-bucket --region ${AWS_REGION} ${AWS_PROFILE} --bucket ${LAMBDA_S3_BUCKET} --create-bucket-configuration LocationConstraint=${AWS_REGION}"
    echo "     $ aws s3 cp --region ${AWS_REGION} ${AWS_PROFILE} ${DIR}/../dist/${STACK_NAME}.zip s3://${LAMBDA_S3_BUCKET}/${STACK_NAME}.zip"
    echo ""
    echo "To create a new stack:"
    echo "     $ bash ${0} --aws-profile myprofile --aws-region ${AWS_REGION}"
    echo ""
    echo "To update the stack:"
    echo "     $ bash ${0} --aws-profile myprofile --aws-region ${AWS_REGION} --update-stack"
    echo ""
    exit 1;
fi

if [ -z "${LAMBDA_S3_BUCKET}" ] || [ -z "${LAMBDA_FUNCTION_NAME}" ]; then
    echo ">> Error! Missing enviromment variables."
    echo "Please edit ./set-env.sh with your correct settings and then source the file."
    echo ""
    echo "Steps to run before trying again:"
    echo "     $ cp ./set-env-dist.sh ./set-env.sh"
    echo "     $ vim ./set-env.sh"
    echo "     $ . ./set-env.sh"
    echo "     $ aws s3api create-bucket --region ${AWS_REGION} ${AWS_PROFILE} --bucket ${LAMBDA_S3_BUCKET} --create-bucket-configuration LocationConstraint=${AWS_REGION}"
    echo "     $ aws s3 cp --region ${AWS_REGION} ${AWS_PROFILE} ${DIR}/../dist/${STACK_NAME}.zip s3://${LAMBDA_S3_BUCKET}/${STACK_NAME}.zip"
    echo ""
    exit 1;
fi

echo "Running \"${STACK_ACTION}\" on stack \"${STACK_NAME}\""
aws cloudformation ${STACK_ACTION} --region ${AWS_REGION} ${AWS_PROFILE} --stack-name ${STACK_NAME} \
    --template-body file://${DIR}/../cloudformation/${CLOUDFORMATION_TEMPLATE} --capabilities CAPABILITY_IAM \
    --parameters \
        ParameterKey=LambdaFunctionName,ParameterValue=${LAMBDA_FUNCTION_NAME} \
        ParameterKey=LambdaS3Bucket,ParameterValue=${LAMBDA_S3_BUCKET} \
        ParameterKey=LambdaS3Key,ParameterValue=${LAMBDA_FUNCTION_NAME}.zip

echo "Waiting for stack \"${STACK_NAME}\" to finish action \"${STACK_ACTION}\""
aws cloudformation --region ${AWS_REGION} ${AWS_PROFILE} wait stack-update-complete --stack-name ${STACK_NAME}
echo "Stack \"${STACK_NAME}\" \"${STACK_ACTION}\" is done."
echo ""
