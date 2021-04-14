#!/bin/sh
yarn build
aws s3 sync build/ s3://gben-me-front-end
