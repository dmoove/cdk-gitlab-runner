import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'DMoove Solutions GmbH',
  authorAddress: 'yannick.tresch@dmoove.com',
  authorName: 'Yannick Tresch',
  authorOrganization: true,
  cdkVersion: '2.126.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: '@yanu23/cdk-gitlab-runner',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/yanu23/cdk-gitlab-runner',
  bundledDeps: ['@iarna/toml'],
});
project.addGitIgnore('samples');
project.synth();
