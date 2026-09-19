/**
 * Bundles the Lambda handlers shipped with this library.
 *
 * Every entry is compiled into `<repo>/lambda/<name>/index.js` and exported
 * as `index.handler`. The constructs resolve the bundle directory relative
 * to their own file, which works from `src/` (tests) and from `lib/`
 * (published package) alike. The `lambda/` directory is part of the npm
 * package, so consumers do not need esbuild or Docker to deploy.
 */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const entries = {
  drain: 'src/drain-runner/lambda/drain.function.ts',
  'pending-jobs': 'src/pending-metric/lambda/pending-jobs.function.ts',
};

await Promise.all(
  Object.entries(entries).map(([name, entry]) =>
    build({
      entryPoints: [join(root, entry)],
      outfile: join(root, 'lambda', name, 'index.js'),
      bundle: true,
      platform: 'node',
      target: 'node22',
      format: 'cjs',
      // The Node.js 22 Lambda runtime ships the AWS SDK v3, so it is not
      // bundled. Everything else (the GitLab client) is inlined.
      external: ['@aws-sdk/*'],
      minify: true,
      sourcemap: false,
      logLevel: 'info',
    }),
  ),
);
