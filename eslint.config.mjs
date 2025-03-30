import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginImport from 'eslint-plugin-import'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['node_modules', 'dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.es2021 },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      'jsx-a11y': pluginJsxA11y,
      import: pluginImport,
      'ts-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      indent: ['error', 2, { SwitchCase: 1 }],
      'max-len': ['error', { code: 120, ignoreComments: true }],
      'no-unused-expressions': ['error', { exclude: ['src/**/*.spec.ts'] }],
    },
  },
]
