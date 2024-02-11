import { AutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import { Instance } from 'aws-cdk-lib/aws-ec2';
import { GitLabConfig } from '../config-generator/config-generator';

export interface ExecutorProps {
  readonly config: GitLabConfig;
  readonly tags?: string[];
}

export interface IExecutor {
  readonly executor: Instance | AutoScalingGroup;
}
