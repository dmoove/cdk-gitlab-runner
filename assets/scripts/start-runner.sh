#!/bin/bash
#
# Creates a GitLab runner for this EC2 instance and writes its
# authentication token into /etc/gitlab-runner/config.toml.
#
# Runs as root from cfn-init. Arguments:
#   $1  ARN of the Secrets Manager secret ({"PrivateToken": "<access token>"})
#   $2  GitLab base URL, e.g. https://gitlab.com/
#
# Reads /etc/gitlab-runner/registration.json (request body for
# POST /api/v4/user/runners, written by CloudFormation Init) and tags the
# instance with RunnerId=<runner id> so the drain Lambda can find the runner.
# The script is idempotent: a second run (cfn-init re-run, instance reboot)
# exits early once the marker file exists.
set -euo pipefail

SECRET_ARN="$1"
GITLAB_URL="${2%/}"
CONFIG_DIR=/etc/gitlab-runner
CONFIG_FILE="$CONFIG_DIR/config.toml"
REGISTRATION_FILE="$CONFIG_DIR/registration.json"
MARKER_FILE="$CONFIG_DIR/.registered"

if [ -f "$MARKER_FILE" ]; then
    echo "Runner already registered ($(cat "$MARKER_FILE")), nothing to do."
    exit 0
fi

# Instance metadata (IMDSv2)
IMDS_TOKEN=$(curl -sf -X PUT "http://169.254.169.254/latest/api/token" \
    -H "X-aws-ec2-metadata-token-ttl-seconds: 300")
INSTANCE_ID=$(curl -sf -H "X-aws-ec2-metadata-token: $IMDS_TOKEN" \
    http://169.254.169.254/latest/meta-data/instance-id)
if [ -z "$INSTANCE_ID" ]; then
    echo "Failed to read the instance id from IMDS" >&2
    exit 1
fi

# GitLab access token from Secrets Manager
ACCESS_TOKEN=$(aws secretsmanager get-secret-value --secret-id "$SECRET_ARN" \
    --query SecretString --output text | jq -r '.PrivateToken // empty')
if [ -z "$ACCESS_TOKEN" ]; then
    echo "Secret $SECRET_ARN has no PrivateToken field" >&2
    exit 1
fi

# Create the runner. The instance id is appended to the description so the
# runner can be identified in the GitLab UI.
PAYLOAD=$(jq --arg id "$INSTANCE_ID" \
    '.description = ((.description // "gitlab-runner") + " " + $id)' \
    "$REGISTRATION_FILE")
RESPONSE=$(curl -sS --fail-with-body --request POST \
    --header "PRIVATE-TOKEN: $ACCESS_TOKEN" \
    --header "Content-Type: application/json" \
    --data "$PAYLOAD" \
    "$GITLAB_URL/api/v4/user/runners") || {
    echo "Failed to create the runner: $RESPONSE" >&2
    exit 1
}

RUNNER_ID=$(echo "$RESPONSE" | jq -r '.id // empty')
RUNNER_TOKEN=$(echo "$RESPONSE" | jq -r '.token // empty')
if [ -z "$RUNNER_ID" ] || [ -z "$RUNNER_TOKEN" ]; then
    echo "Unexpected response from GitLab: $RESPONSE" >&2
    exit 1
fi

# Write the runner authentication token into the generated config.toml
sed -i -e "s|{TOKEN}|$RUNNER_TOKEN|g" "$CONFIG_FILE"
chmod 600 "$CONFIG_FILE"

# Link the instance to the runner for the drain Lambda
aws ec2 create-tags --resources "$INSTANCE_ID" \
    --tags "Key=RunnerId,Value=$RUNNER_ID"

echo "$RUNNER_ID" > "$MARKER_FILE"
echo "Registered runner $RUNNER_ID for instance $INSTANCE_ID."
