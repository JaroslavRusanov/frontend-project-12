import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import functional from 'eslint-plugin-functional'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },


    plugins: {
      react,
      'react-hooks': reactHooks,
      functional,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      '@typescript-eslint': tsPlugin
    },

    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: { project: './tsconfig.app.json' } }
    },

    rules: {
      'import/extensions': 0,
      'import/no-unresolved': 0,
      'react/prop-types': 0,
      'no-console': 0,
      'react/react-in-jsx-scope': 0,
      'functional/no-conditional-statements': 0,
      'functional/no-expression-statements': 0,
      'functional/immutable-data': 0,
      'functional/functional-parameters': 0,
      'functional/no-try-statements': 0,
      'functional/no-throw-statements': 0,
      'functional/no-return-void': 0,
      'no-underscore-dangle': [2, { allow: ['__filename', '__dirname'] }],
      'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }]
    },

    ignores: [
      'dist',
      'build',
      'node_modules',
    ],
  }
]
