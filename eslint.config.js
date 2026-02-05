//import tseslint from 'typescript-eslint';
const tseslint = require('typescript-eslint');

//import prettier from 'eslint-config-prettier';
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config(
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['error', 'warn', 'log'] }],
      '@typescript-eslint/no-extraneous-class': ['error', { 'allowWithDecorator': true }]
    },
  },
  prettier,
);
