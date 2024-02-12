import { App, Stack } from 'aws-cdk-lib';
import { Key } from 'aws-cdk-lib/aws-kms';
import { GitLabCacheBucket } from '../src/cache/cache-bucket';
import { GitLabConfig } from '../src/config-generator/config-generator';

describe('GitLabConfig Generator', () => {
  let app: App, stack: Stack, key: Key, cacheBucket: GitLabCacheBucket;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack', {
      env: { region: 'us-east-1' },
    });
    key = new Key(stack, 'EncryptionKey');
    cacheBucket = new GitLabCacheBucket(stack, 'CacheBucket', {
      encryptionKey: key,
    });
  });

  test('should initialize with correct properties', () => {
    const config = new GitLabConfig({
      concurrent: 2,
      gitlabUrl: 'https://gitlab.com',
    });
    config.addDockerExecutor({
      disableCache: false,
      gitlabImage: 'gitlab/gitlab-ce:latest',
      privileged: true,
    });

    expect(config).toBeDefined();
    const tomlConfig = config.generateToml();
    expect(tomlConfig).toContain('concurrent = 2');
  });

  test('addDockerExecutor should correctly add a Docker executor', () => {
    const config = new GitLabConfig({
      concurrent: 2,
      gitlabUrl: 'https://gitlab.com',
    });
    config.addDockerExecutor({
      disableCache: false,
      gitlabImage: 'gitlab/gitlab-ce:latest',
      privileged: true,
    });

    const tomlConfig = config.generateToml();
    expect(tomlConfig).toContain('url = "https://gitlab.com"');
    expect(tomlConfig).toContain('image = "gitlab/gitlab-ce:latest"');
    expect(tomlConfig).toContain('privileged = true');
    expect(tomlConfig).toContain('disable_cache = false');
    expect(tomlConfig).toContain(
      '"DOCKER_AUTH_CONFIG={ \\"credsStore\\": \\"ecr-login\\" }"',
    );
  });

  test('addEnvironment should correctly add an environment variable', () => {
    const config = new GitLabConfig({
      concurrent: 2,
      gitlabUrl: 'https://gitlab.com',
    });
    config.addDockerExecutor({
      disableCache: false,
      gitlabImage: 'gitlab/gitlab-ce:latest',
      privileged: true,
      env: { TEST: 'test' },
    });

    const tomlConfig = config.generateToml();
    expect(tomlConfig).toContain('TEST=test');
  });

  test('addCache should correctly add cache configuration', () => {
    const config = new GitLabConfig({
      concurrent: 2,
      gitlabUrl: 'https://gitlab.com',
    });
    config.addDockerExecutor({
      disableCache: false,
      gitlabImage: 'gitlab/gitlab-ce:latest',
      privileged: true,
    });

    config.addCache(stack, cacheBucket);
    const tomlConfig = config.generateToml();
    expect(tomlConfig).toContain('Type = "s3"');
    expect(tomlConfig).toContain(`BucketName = "${cacheBucket.bucketName}"`);
    expect(tomlConfig).toContain('Shared = true');
  });

  test('generateToml should return a valid TOML string', () => {
    const config = new GitLabConfig({
      concurrent: 2,
      gitlabUrl: 'https://gitlab.com',
    });
    config.addDockerExecutor({
      disableCache: false,
      gitlabImage: 'gitlab/gitlab-ce:latest',
      privileged: true,
    });

    // This test verifies if the TOML string is correctly generated
    // It's more about the structure rather than content, as content is verified in above tests
    const tomlConfig = config.generateToml();
    expect(tomlConfig).toMatch(/concurrent = \d+/);
    expect(tomlConfig).toMatch(/url = "https:\/\/gitlab.com"/);
    expect(tomlConfig).toMatch(/executor = "docker"/);
  });
});
