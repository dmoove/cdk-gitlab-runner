import eslint from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import importX from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'lib/**',
      'lambda/**',
      'dist/**',
      'docs/**',
      'coverage/**',
      'node_modules/**',
      '**/*.d.ts',
      '**/*.generated.ts',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  prettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: { project: './tsconfig.eslint.json' },
        node: true,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/return-await': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'public-static-field',
            'public-static-method',
            'protected-static-field',
            'protected-static-method',
            'private-static-field',
            'private-static-method',
            'field',
            'constructor',
            'method',
          ],
        },
      ],
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/test/**',
            '**/scripts/**',
            '**/lambda/**',
            '**/lambda-common/**',
            'eslint.config.mjs',
          ],
          optionalDependencies: false,
          peerDependencies: true,
        },
      ],
      'import-x/no-unresolved': 'error',
      'import-x/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'no-duplicate-imports': 'error',
      'no-shadow': 'off',
      'key-spacing': 'error',
      'no-multiple-empty-lines': 'error',
      'no-return-await': 'off',
      'no-trailing-spaces': 'error',
      'dot-notation': 'error',
      'no-bitwise': 'error',
    },
  },
  {
    files: ['**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
);
