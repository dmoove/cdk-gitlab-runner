import { AutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import { Instance } from 'aws-cdk-lib/aws-ec2';
import { GitLabConfig } from '../config-generator/config-generator';

/**
 * Common properties used by the executor implementations.
 */
export interface ExecutorProps {
  /**
   * Generated GitLab runner configuration.
   */
  readonly config: GitLabConfig;
  /**
   * Optional tags applied to created resources.
   */
  readonly tags?: string[];
}

/**
 * Interface implemented by all executor constructs.
 */
export interface IExecutor {
  /**
   * Underlying compute resource used by the executor.
   */
  readonly executor: Instance | AutoScalingGroup;
}
