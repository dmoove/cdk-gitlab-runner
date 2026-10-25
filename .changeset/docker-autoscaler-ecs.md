---
'@dmoove/cdk-gitlab-runner': minor
---

Add the Docker Autoscaler executor: `GitLabRunner.addDockerAutoscalerExecutor()`
runs the runner manager as an ECS Fargate service and scales an EC2
AutoScaling group through GitLab's fleeting plugin for AWS. Jobs run with
Docker on the instances, so `image:` and `services:` work, and the group
scales to zero without an EKS cluster. The runner is created and deleted by
the new `GitLabRunnerRegistration` construct, which stores the runner token
in Secrets Manager.
