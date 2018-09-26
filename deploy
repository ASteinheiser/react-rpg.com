#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

ENV=$1

DevBucket="react-rpg.com"
DevBuild="build"

BUCKET="s3://${DevBucket}"
BUILD=$DevBuild
echo
echo -e "Deploying new ${GREEN}PROD${NC} build to bucket: ${RED}${BUCKET}${NC}"
echo

echo
echo -e "${CYAN}BUILDING!${NC}"
echo
npm run ${BUILD}

echo
echo -e "${CYAN}DELETING S3 FILES!${NC}"
echo
aws s3 rm ${BUCKET} --recursive

echo
echo -e "${CYAN}UPLOADING NEW BUILD!${NC}"
echo
aws s3 cp build/ ${BUCKET} --recursive

echo
echo -e "${GREEN}UPLOAD SUCCESS!${NC}"
echo
