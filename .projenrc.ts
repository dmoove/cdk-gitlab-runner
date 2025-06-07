import { awscdk } from 'projen';
import { EndOfLine, TrailingComma } from 'projen/lib/javascript';
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
  prettier: true,
  prettierOptions: {
    settings: {
      semi: true,
      singleQuote: true,
      trailingComma: TrailingComma.ALL,
      tabWidth: 2,
      endOfLine: EndOfLine.LF,
    },
  },
  eslintOptions: {
    prettier: true,
    dirs: ['src'],
  },
  eslint: true,
  prerelease: 'pre',
  catalog: {
    twitter: 'yanu23',
  },
});

project.jest?.addTestMatch('<rootDir>/test/**/*(*.)@(spec|test).ts?(x)');

project.addGitIgnore('samples');
project.addGitIgnore('/lambda');

const commonOptions = '--bundle --external:aws-sdk --platform=node';
const preCompileTask = project.tasks.tryFind('pre-compile');
if (preCompileTask) {
  preCompileTask.exec(
    `esbuild ${commonOptions} src/drain-runner/lambda/drain.function.ts --outfile=lambda/index.js`,
  );
  preCompileTask.exec(
    `esbuild ${commonOptions} src/pending-jobs/lambda/pending-jobs.function.ts --outfile=lambda/pending-jobs/index.js`,
  );
}

project.synth();
