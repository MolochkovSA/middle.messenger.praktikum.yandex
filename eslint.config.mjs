import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import pluginAirbnb from 'eslint-config-airbnb'
import pluginImport from 'eslint-plugin-import'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
      import: pluginImport,
      'ts-eslint': tseslint,
      'react-refresh': pluginReactRefresh,
      airbnb: pluginAirbnb,
    },
  },
  { ignores: ['node_modules', 'build', 'scripts'] },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2021 },
      parserOptions: {
        ...pluginReact.configs.recommended.parserOptions,
        ecmaFeatures: {
          tsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      'max-len': ['error', { code: 120, ignoreComments: true }],
      'react/prop-types': [2, { ignore: ['children'] }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-refresh/only-export-components': 'warn',
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',
      'jsx-a11y/alt-text': 'error',
      'react/display-name': 'off',
    },
  },
]
