import { GitlabExecutor } from '../config-generator/enums';

export type GlConfig = {
  /**
   * The maximum jobs that a runner can run at the same time
   */
  concurrent: number;
  /**
   * Log format of the runner process
   */
  log_format?: string;
  /**
   * The configuration of a runner
   */
  runners: RunnerConfig[];
};

export type RunnerConfig = {
  url: string;
  executor: GitlabExecutor;
  token: string;
  environment?: string[];
  docker?: {
    image: string;
    privileged: boolean;
    disable_cache: boolean;
    volumes: string[];
  };
  autoscaler?: AutoscalerConfig;
  cache?: {
    Type: string;
    Shared: boolean;
    s3: {
      BucketName: string;
      BucketLocation: string;
    };
  };
};

export type AutoscalerPolicyConfig = {
  idle_count: number;
  idle_time: string;
  periods?: string[];
  timezone?: string;
};

export type AutoscalerConfig = {
  plugin: string;
  capacity_per_instance: number;
  max_use_count: number;
  max_instances: number;
  instance_ready_command?: string;
  plugin_config: {
    name: string;
    region: string;
  };
  connector_config: {
    username: string;
    use_external_addr: boolean;
  };
  policy: AutoscalerPolicyConfig[];
};
