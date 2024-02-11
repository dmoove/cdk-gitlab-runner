import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'DMoove Solutions GmbH',
  authorAddress: 'yannick.tresch@dmoove.com',
  authorName: 'Yannick Tresch',
  authorOrganization: true,
  cdkVersion: '2.126.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.3.0',
  name: '@yanu23/cdk-gitlab-runner',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/yanu23/cdk-gitlab-runner',
  bundledDeps: ['@iarna/toml'],
  keywords: ['cdk', 'gitlab', 'runner', 'aws', 'cdk-constructs'],
  releaseToNpm: false,
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['github-actions', 'github-actions[bot]', 'yanu23'],
  },
});
project.addGitIgnore('samples');
project.synth();
