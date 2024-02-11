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
  bundledDeps: [
    '@iarna/toml@2.2.5',
    '@types/aws-lambda@8.10.133',
    'gitlab@14.2.2',
    'aws-sdk@2.1555.0',
    'esbuild@0.20.0',
  ],
  keywords: ['cdk', 'gitlab', 'runner', 'aws', 'cdk-constructs'],
  releaseToNpm: false,
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: [
      'github-actions',
      'github-actions[bot]',
      'dependabot',
      'dependabot[bot]',
      'yanu23',
    ],
  },
  dependabot: true,
});

project.addGitIgnore('samples');
project.addGitIgnore('/lambda');

const commonOptions = '--bundle --external:aws-sdk --platform=node';
const preCompileTask = project.tasks.tryFind('pre-compile');
if (preCompileTask) {
  preCompileTask.exec(
    `esbuild ${commonOptions} src/drain-runner/lambda/drain.function.ts --outfile=lambda/drain.function.ts`,
  );
}

project.synth();
