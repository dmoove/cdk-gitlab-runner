#!/bin/bash

TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
instanceid=$(curl -H "X-aws-ec2-metadata-token: $TOKEN" -v http://169.254.169.254/latest/meta-data/instance-id)

gltoken=$(aws secretsmanager get-secret-value --secret-id "${SECRET}" --query SecretString --output text | jq --raw-output ".Token")
runnerinfos=$(curl --request POST "https://git.tech.rz.db.de/api/v4/runners" --form "token=$gltoken" --form "tag_list=$1")

runnertoken=$(echo $runnerinfos | jq --raw-output ".token")
runnerid=$(echo $runnerinfos | jq  --raw-output ".id")
sudo sed -i -e "s/{TOKEN}/$runnertoken/g" /etc/gitlab-runner/config.toml

aws ec2 create-tags --resources $instanceid --tags Key=RunnerId,Value=$runnerid
