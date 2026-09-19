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
   * GitLab runner tags. Jobs select runners by these tags. The account id,
   * region, `docker` and `runner` are always added.
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
