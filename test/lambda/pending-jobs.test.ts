import {
  CloudWatchClient,
  PutMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { mockClient } from 'aws-sdk-client-mock';
import {
  handler,
  matchesRunner,
} from '../../src/pending-metric/lambda/pending-jobs.function';
import { jsonResponse, mockFetch } from './fetch-mock';

const cwMock = mockClient(CloudWatchClient);
const smMock = mockClient(SecretsManagerClient);

describe('pending jobs handler', () => {
  let fetchMock: ReturnType<typeof mockFetch>;

  beforeEach(() => {
    process.env.SECRET_ARN = 'arn:secret';
    process.env.GIT_ENDPOINT = 'https://gitlab.example.com';
    process.env.EXECUTOR = 'Stack/Runner/DockerExecutor';
    delete process.env.PROJECT_IDS;
    delete process.env.GROUP_ID;
    delete process.env.RUNNER_TAGS;
    cwMock.reset();
    smMock.reset();
    cwMock.on(PutMetricDataCommand).resolves({});
    smMock.on(GetSecretValueCommand).resolves({
      SecretString: JSON.stringify({ PrivateToken: 'glpat-x' }),
    });
    fetchMock = mockFetch();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  test('counts pending jobs of the configured projects', async () => {
    process.env.PROJECT_IDS = '1, 2';
    fetchMock.on(
      'GET',
      '/api/v4/projects/1/jobs',
      jsonResponse([{ id: 1, status: 'pending' }]),
    );
    fetchMock.on(
      'GET',
      '/api/v4/projects/2/jobs',
      jsonResponse([
        { id: 2, status: 'pending' },
        { id: 3, status: 'pending' },
      ]),
    );

    const result = await handler();

    expect(result).toEqual({ pendingJobs: 3, projects: 2 });
    expect(fetchMock.calls[0].url.searchParams.get('scope')).toBe('pending');
    const input = cwMock.commandCalls(PutMetricDataCommand)[0].args[0].input;
    expect(input.Namespace).toBe('GitLabRunner');
    expect(input.MetricData?.[0]).toMatchObject({
      MetricName: 'PendingJobs',
      Value: 3,
      Dimensions: [{ Name: 'Executor', Value: 'Stack/Runner/DockerExecutor' }],
    });
  });

  test('resolves the projects of a group and filters by runner tags', async () => {
    process.env.GROUP_ID = '10';
    process.env.RUNNER_TAGS = 'docker,linux';
    fetchMock.on(
      'GET',
      '/api/v4/groups/10/projects',
      jsonResponse([{ id: 7 }]),
    );
    fetchMock.on(
      'GET',
      '/api/v4/projects/7/jobs',
      jsonResponse([
        { id: 1, status: 'pending', tag_list: ['docker'] },
        { id: 2, status: 'pending', tag_list: ['docker', 'gpu'] },
        { id: 3, status: 'pending', tag_list: [] },
      ]),
    );

    const result = await handler();

    expect(result).toEqual({ pendingJobs: 2, projects: 1 });
    expect(fetchMock.calls[0].url.searchParams.get('include_subgroups')).toBe(
      'true',
    );
  });

  test('fails when neither projects nor a group are configured', async () => {
    await expect(handler()).rejects.toThrow(
      'Either PROJECT_IDS or GROUP_ID must be set',
    );
    expect(cwMock.commandCalls(PutMetricDataCommand)).toHaveLength(0);
  });
});

describe('matchesRunner', () => {
  test('matches everything without runner tags', () => {
    expect(
      matchesRunner({ id: 1, status: 'pending', tag_list: ['x'] }, []),
    ).toBe(true);
  });

  test('requires every job tag to be a runner tag', () => {
    expect(
      matchesRunner({ id: 1, status: 'pending', tag_list: ['a', 'b'] }, ['a']),
    ).toBe(false);
    expect(
      matchesRunner({ id: 1, status: 'pending', tag_list: ['a'] }, ['a', 'b']),
    ).toBe(true);
    expect(matchesRunner({ id: 1, status: 'pending' }, ['a'])).toBe(true);
  });
});
