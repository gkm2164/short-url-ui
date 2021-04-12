yarn build
scp -i ~/aws-pems/LightsailDefaultKey-us-east-1.pem -r ./build ubuntu@23.20.103.65:./short-url/apps/
