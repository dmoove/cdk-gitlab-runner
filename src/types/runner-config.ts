import { GitlabExecutor } from '../config-generator/enums';

export type GlConfig = {
  concurrent: number;
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
  cache?: {
    Type: string;
    Shared: boolean;
    s3: {
      BucketName: string;
      BucketLocation: string;
    };
  };
};
