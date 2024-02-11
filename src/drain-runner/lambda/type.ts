export type GitLabSecret = {
  Token: string;
  PrivateToken: string;
};

export interface EditRunnerOptions {
  description?: string;
  active?: boolean;
  paused?: boolean;
  tagList?: string[];
  runUntagged?: boolean;
  locked?: boolean;
  accessLevel?: 'not_protected' | 'ref_protected';
  maximumTimeout?: number;
}

export interface AutoScalingEvent {
  'version': string;
  'id': string;
  'detail-type': string;
  'source': string;
  'account': string;
  'time': string;
  'region': string;
  'resources': string[];
  'detail': {
    LifecycleActionToken: string;
    AutoScalingGroupName: string;
    LifecycleHookName: string;
    EC2InstanceId: string;
    LifecycleTransition: string;
    NotificationMetadata: string;
    Origin: string;
    Destination: string;
  };
}

export interface Job {
  id: number;
  status: string;
  stage: string;
  name: string;
  ref: string;
  tag: boolean;
  coverage: number | null;
  created_at: string;
  started_at: string;
  finished_at: string;
  duration: number;
  queued_duration: number;
  user: User;
  commit: Commit;
  pipeline: Pipeline;
  project: Project;
}

export interface User {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string;
  web_url: string;
  created_at: string;
  bio: string | null;
  location: string | null;
  public_email: string;
  skype: string;
  linkedin: string;
  twitter: string;
  website_url: string;
  organization: string | null;
}

export interface Commit {
  id: string;
  short_id: string;
  title: string;
  created_at: string;
  parent_ids: string[];
  message: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committer_name: string;
  committer_email: string;
  committed_date: string;
}

export interface Pipeline {
  id: number;
  sha: string;
  ref: string;
  status: string;
}

export interface Project {
  id: number;
  description: string | null;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  created_at: string;
}
