import {
  AutoScalingClient,
  CompleteLifecycleActionCommand,
  RecordLifecycleActionHeartbeatCommand,
} from '@aws-sdk/client-auto-scaling';
import { DescribeTagsCommand, EC2Client } from '@aws-sdk/client-ec2';
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { mockClient } from 'aws-sdk-client-mock';
import {
  DrainEvent,
  handler,
} from '../../src/drain-runner/lambda/drain.function';
import { mockFetch, jsonResponse } from './fetch-mock';

const ec2Mock = mockClient(EC2Client);
const asgMock = mockClient(AutoScalingClient);
const smMock = mockClient(SecretsManagerClient);

const event: DrainEvent = {
  detail: {
    AutoScalingGroupName: 'asg',
    LifecycleHookName: 'hook',
    EC2InstanceId: 'i-123',
  },
};

describe('drain handler', () => {
  let fetchMock: ReturnType<typeof mockFetch>;

  beforeEach(() => {
    process.env.SECRET_ARN = 'arn:secret';
    process.env.GIT_ENDPOINT = 'https://gitlab.example.com/';
    ec2Mock.reset();
    asgMock.reset();
    smMock.reset();
    smMock.on(GetSecretValueCommand).resolves({
      SecretString: JSON.stringify({ PrivateToken: 'glpat-x' }),
    });
    ec2Mock
      .on(DescribeTagsCommand)
      .resolves({ Tags: [{ Key: 'RunnerId', Value: '42' }] });
    asgMock.on(CompleteLifecycleActionCommand).resolves({});
    asgMock.on(RecordLifecycleActionHeartbeatCommand).resolves({});
    fetchMock = mockFetch();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  test('pauses, deletes the runner and continues when no job is running', async () => {
    fetchMock.on('PUT', '/api/v4/runners/42', jsonResponse({ id: 42 }));
    fetchMock.on('GET', '/api/v4/runners/42/jobs', jsonResponse([]));
    fetchMock.on('DELETE', '/api/v4/runners/42', jsonResponse(null, 204));

    const result = await handler(event);

    expect(result).toEqual({ status: 'drained', runnerId: 42, runningJobs: 0 });
    expect(fetchMock.calls.map((c) => `${c.method} ${c.url.pathname}`)).toEqual(
      [
        'PUT /api/v4/runners/42',
        'GET /api/v4/runners/42/jobs',
        'DELETE /api/v4/runners/42',
      ],
    );
    expect(fetchMock.calls[0].body).toEqual({ paused: true });
    expect(fetchMock.calls[0].headers['PRIVATE-TOKEN']).toBe('glpat-x');
    expect(fetchMock.calls[1].url.searchParams.get('status')).toBe('running');
    expect(
      asgMock.commandCalls(CompleteLifecycleActionCommand)[0].args[0].input,
    ).toEqual({
      AutoScalingGroupName: 'asg',
      LifecycleHookName: 'hook',
      InstanceId: 'i-123',
      LifecycleActionResult: 'CONTINUE',
    });
  });

  test('records a heartbeat while jobs are running and follows pagination', async () => {
    fetchMock.on('PUT', '/api/v4/runners/42', jsonResponse({ id: 42 }));
    fetchMock.on('GET', '/api/v4/runners/42/jobs', (url) =>
      url.searchParams.get('page') === '2'
        ? jsonResponse([{ id: 2, status: 'running' }])
        : jsonResponse([{ id: 1, status: 'running' }], 200, {
            'x-next-page': '2',
          }),
    );

    const result = await handler(event);

    expect(result).toEqual({
      status: 'draining',
      runnerId: 42,
      runningJobs: 2,
    });
    expect(
      asgMock.commandCalls(RecordLifecycleActionHeartbeatCommand),
    ).toHaveLength(1);
    expect(asgMock.commandCalls(CompleteLifecycleActionCommand)).toHaveLength(
      0,
    );
    expect(fetchMock.calls.filter((c) => c.method === 'DELETE')).toHaveLength(
      0,
    );
  });

  test('abandons the lifecycle action without touching GitLab', async () => {
    const result = await handler({ ...event, action: 'abandon' });

    expect(result).toEqual({ status: 'abandoned' });
    expect(fetchMock.calls).toHaveLength(0);
    expect(
      asgMock.commandCalls(CompleteLifecycleActionCommand)[0].args[0].input,
    ).toMatchObject({ LifecycleActionResult: 'ABANDON' });
  });

  test('continues when the runner no longer exists in GitLab', async () => {
    fetchMock.on(
      'PUT',
      '/api/v4/runners/42',
      jsonResponse({ message: '404' }, 404),
    );

    const result = await handler(event);

    expect(result.status).toBe('drained');
    expect(fetchMock.calls).toHaveLength(1);
    expect(asgMock.commandCalls(CompleteLifecycleActionCommand)).toHaveLength(
      1,
    );
  });

  test('fails when the RunnerId tag is missing', async () => {
    ec2Mock.on(DescribeTagsCommand).resolves({ Tags: [] });

    await expect(handler(event)).rejects.toThrow(
      'Instance i-123 has no valid RunnerId tag',
    );
    expect(fetchMock.calls).toHaveLength(0);
  });

  test('fails when the secret has no PrivateToken', async () => {
    smMock.on(GetSecretValueCommand).resolves({
      SecretString: JSON.stringify({ Token: 'legacy' }),
    });

    await expect(handler(event)).rejects.toThrow('has no "PrivateToken" field');
  });

  test('fails on unexpected GitLab errors', async () => {
    fetchMock.on(
      'PUT',
      '/api/v4/runners/42',
      jsonResponse({ message: 'nope' }, 500),
    );

    await expect(handler(event)).rejects.toThrow(
      'GitLab PUT /runners/42 failed with 500',
    );
  });
});
