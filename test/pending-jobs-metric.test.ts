import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { PendingJobsMetric } from '../src/pending-metric';

describe('PendingJobsMetric', () => {
  let stack: Stack;
  let secret: Secret;

  beforeEach(() => {
    stack = new Stack();
    secret = new Secret(stack, 'Secret');
  });

  test('creates a scheduled function with metric permissions', () => {
    const metric = new PendingJobsMetric(stack, 'Metric', {
      gitEndpoint: 'https://gitlab.com',
      secret,
      groupId: 10,
      projectIds: [1, 2],
      runnerTags: ['docker'],
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs22.x',
      Handler: 'index.handler',
      Environment: {
        Variables: {
          GIT_ENDPOINT: 'https://gitlab.com',
          GROUP_ID: '10',
          PROJECT_IDS: '1,2',
          RUNNER_TAGS: 'docker',
          EXECUTOR: 'Default/Metric',
        },
      },
    });
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          {
            Action: 'cloudwatch:PutMetricData',
            Effect: 'Allow',
            Resource: '*',
            Condition: {
              StringEquals: { 'cloudwatch:namespace': 'GitLabRunner' },
            },
          },
        ]),
      },
    });
    template.hasResourceProperties('AWS::Events::Rule', {
      ScheduleExpression: 'rate(1 minute)',
    });
    expect(metric.metric.dimensions).toEqual({ Executor: 'Default/Metric' });
  });

  test('requires a project or group', () => {
    expect(
      () =>
        new PendingJobsMetric(stack, 'Metric', {
          gitEndpoint: 'https://gitlab.com',
          secret,
        }),
    ).toThrow('requires at least one of projectIds or groupId');
  });
});
