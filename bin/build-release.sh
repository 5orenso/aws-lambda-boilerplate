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

# Read command line input:
while [[ $# > 0 ]]; do
    key="$1"
    case $key in
        -h|--help)
            HELP="true"
        ;;
        *)
            # unknown option
        ;;
    esac
    shift # past argument or value
done

if [ ! -z "$HELP" ]; then
    echo "bash ${0} - help"
    echo "    [-h|--help]"
    echo "    [-b|--current-branch <current branch>]"
    echo "    [-s|--static-lambda-bucket <s3 bucket for first upload>]"
    echo "    [-a|--auto-lambda-bucket <s3 bucket for concecutive uploads>]"
    echo ""
    echo "This script will build a release file you are able to upload directly to AWS S3."
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
    echo ""
    exit 1;
fi

# Make dist folder
mkdir -p dist

# Move away node_modules to be able to restore after build
mv ./node_modules ./node_modules2

# Install all node_modules for production
npm install --production

# Make zip-file
zip -FSr  dist/${LAMBDA_FUNCTION_NAME}${CURRENT_BRANCH}.zip ./ \
    -x "*dist*" "bin/*" ".git*" "*.md" "*.DS_Store" "*.sh" "*test*" "package.json" "Gruntfile.js" "*node_modules2*" "*coverage/*" ".js*" "*doc/*"

# Clean up production files andre restore to previous state
rm -rf node_modules
mv ./node_modules2 ./node_modules

# Output some description to the user to be helpful
echo ""
echo "TODO:"
echo "First time: Upload the zip file to S3 to be able to run it from Lambda."
echo "$ aws s3 cp dist/${LAMBDA_FUNCTION_NAME}.zip s3://${LAMBDA_S3_BUCKET}/${LAMBDA_FUNCTION_NAME}.zip"
echo ""
echo "Next time: Upload the zip file to S3 to have the Lambda function automatically updated."
echo "$ aws s3 cp dist/${LAMBDA_FUNCTION_NAME}.zip s3://${LAMBDA_S3_AUTODEPLOY_BUCKET}/${LAMBDA_FUNCTION_NAME}.zip"
