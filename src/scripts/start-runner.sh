#!/bin/bash

# Assuming $1 is passed correctly from the InitCommand and contains tags
SECRET="$1"
GITLAB_URL="$2"
tags="$3"

# Fetch the AWS EC2 instance metadata token
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
if [ $? -ne 0 ]; then
    echo "Failed to fetch EC2 instance metadata token"
    exit 1
fi

# Fetch the instance ID
instanceid=$(curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/instance-id)
if [ -z "$instanceid" ]; then
    echo "Failed to fetch EC2 instance ID"
    exit 1
fi

# Fetch the GitLab token from AWS Secrets Manager
gltoken=$(aws secretsmanager get-secret-value --secret-id "$SECRET" --query SecretString --output text | jq --raw-output ".Token")
if [ -z "$gltoken" ]; then
    echo "Failed to fetch GitLab token from AWS Secrets Manager"
    exit 1
fi

# Register the runner with GitLab
runnerinfos=$(curl --request POST "${GITLAB_URL}api/v4/runners" --form "token=$gltoken" --form "tag_list=$tags")
if [ -z "$runnerinfos" ]; then
    echo "Failed to register runner with GitLab"
    exit 1
fi

# Extract the runner token and ID
runnertoken=$(echo $runnerinfos | jq --raw-output ".token")
runnerid=$(echo $runnerinfos | jq  --raw-output ".id")

# Replace the token placeholder in the config.toml file
if [ -n "$runnertoken" ]; then
    sudo sed -i -e "s/{TOKEN}/$runnertoken/g" /etc/gitlab-runner/config.toml
else
    echo "Runner token is empty"
    exit 1
fi

# Tag the EC2 instance with the runner ID
aws ec2 create-tags --resources $instanceid --tags Key=RunnerId,Value=$runnerid
if [ $? -ne 0 ]; then
    echo "Failed to tag EC2 instance with runner ID"
    exit 1
fi

echo "GitLab runner registration and configuration completed successfully."
