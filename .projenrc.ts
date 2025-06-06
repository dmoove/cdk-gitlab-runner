import { awscdk } from 'projen';
import { EndOfLine, TrailingComma } from 'projen/lib/javascript';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'DMoove Solutions GmbH',
  authorAddress: 'yannick.tresch@dmoove.com',
  authorName: 'Yannick Tresch',
  authorOrganization: true,
  cdkVersion: '2.126.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.5.0',
  name: '@dmoove/cdk-gitlab-runner',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/dmoove/cdk-gitlab-runner',
  githubOptions: {
    pullRequestLintOptions: {
      semanticTitleOptions: {
        types: [
          'feat',
          'fix',
          'chore',
          'docs',
          'refactor',
          'test',
          'build',
          'ci',
          'perf',
          'codex',
        ],
        requireScope: true,
      },
    },
  },
  pullRequestTemplateContents: [
    '<!-- Title must follow `type[scope]: description`.',
    'Allowed types: feat, fix, chore, docs, refactor, test, build, ci, perf, codex.',
    'Use `codex[scope]:` for AI generated changes. -->',
    '',
    'Fixes #',
    '',
    '## Summary',
    '',
    '-',
    '',
    '## Testing',
    '',
    '-',
  ],
  minNodeVersion: '20.0.0',
  workflowNodeVersion: '20.x',
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
      'dmoove',
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

project.addDevDeps('@types/node@^20');

project.addGitIgnore('samples');
project.addGitIgnore('/lambda');

const commonOptions = '--bundle --external:aws-sdk --platform=node';
const preCompileTask = project.tasks.tryFind('pre-compile');
if (preCompileTask) {
  preCompileTask.exec(
    `esbuild ${commonOptions} src/drain-runner/lambda/drain.function.ts --outfile=lambda/index.js`,
  );
}

project.synth();
