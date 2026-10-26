import {
  GetSecretValueCommand,
  PutSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { mockClient } from 'aws-sdk-client-mock';
import { handler } from '../../src/runner-registration/lambda/runner-registration.function';
import { jsonResponse, mockFetch } from './fetch-mock';

const smMock = mockClient(SecretsManagerClient);

const properties = {
  ServiceToken: 'arn:lambda',
  AccessTokenSecretArn: 'arn:access',
  RunnerTokenSecretArn: 'arn:runner',
  GitLabUrl: 'https://gitlab.example.com/',
  Registration: JSON.stringify({
    runner_type: 'group_type',
    group_id: 7,
    tag_list: ['docker'],
  }),
};

const base = {
  ServiceToken: 'arn:lambda',
  ResponseURL: 'https://example.com',
  StackId: 'stack',
  RequestId: 'request',
  LogicalResourceId: 'Registration',
  ResourceType: 'Custom::GitLabRunnerRegistration',
  ResourceProperties: properties,
};

describe('runner registration handler', () => {
  let fetchMock: ReturnType<typeof mockFetch>;

  beforeEach(() => {
    smMock.reset();
    smMock.on(GetSecretValueCommand).resolves({
      SecretString: JSON.stringify({ PrivateToken: 'glpat-x' }),
    });
    smMock.on(PutSecretValueCommand).resolves({});
    fetchMock = mockFetch();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  test('creates a runner and stores its token in the secret', async () => {
    fetchMock.on(
      'POST',
      '/api/v4/user/runners',
      jsonResponse({ id: 99, token: 'glrt-secret' }, 201),
    );

    const result = await handler({
      ...base,
      RequestType: 'Create',
    });

    expect(result).toEqual({
      PhysicalResourceId: '99',
      Data: { RunnerId: '99' },
    });
    expect(JSON.stringify(result)).not.toContain('glrt-secret');
    expect(fetchMock.calls[0].body).toEqual({
      runner_type: 'group_type',
      group_id: 7,
      tag_list: ['docker'],
    });
    expect(fetchMock.calls[0].headers['PRIVATE-TOKEN']).toBe('glpat-x');
    const put = smMock.commandCalls(PutSecretValueCommand)[0].args[0].input;
    expect(put.SecretId).toBe('arn:runner');
    expect(JSON.parse(put.SecretString ?? '')).toEqual({
      token: 'glrt-secret',
      id: 99,
    });
  });

  test('creates a new runner on update', async () => {
    fetchMock.on(
      'POST',
      '/api/v4/user/runners',
      jsonResponse({ id: 100, token: 'glrt-new' }, 201),
    );

    const result = await handler({
      ...base,
      RequestType: 'Update',
      PhysicalResourceId: '99',
      OldResourceProperties: properties,
    });

    expect(result.PhysicalResourceId).toBe('100');
  });

  test('fails when GitLab rejects the runner', async () => {
    fetchMock.on(
      'POST',
      '/api/v4/user/runners',
      jsonResponse({ message: '403 Forbidden' }, 403),
    );

    await expect(
      handler({
        ...base,
        RequestType: 'Create',
      }),
    ).rejects.toThrow('403');
    expect(smMock.commandCalls(PutSecretValueCommand)).toHaveLength(0);
  });

  test('deletes the runner and ignores a runner that is gone', async () => {
    fetchMock.on('DELETE', '/api/v4/runners/99', jsonResponse(null, 204));
    fetchMock.on('DELETE', '/api/v4/runners/98', jsonResponse({}, 404));

    for (const id of ['99', '98']) {
      const result = await handler({
        ...base,
        RequestType: 'Delete',
        PhysicalResourceId: id,
      });
      expect(result.PhysicalResourceId).toBe(id);
    }
    expect(fetchMock.calls.map((call) => call.method)).toEqual([
      'DELETE',
      'DELETE',
    ]);
  });

  test('skips the delete of a runner that was never created', async () => {
    await handler({
      ...base,
      RequestType: 'Delete',
      PhysicalResourceId: 'request-id',
    });

    expect(fetchMock.calls).toHaveLength(0);
  });
});
