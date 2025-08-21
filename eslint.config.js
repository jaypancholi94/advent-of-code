import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      
      // General ESLint rules suitable for competitive programming
      'no-console': 'off', // Allow console.log for debugging and output
      'no-debugger': 'warn',
      'no-unreachable': 'error',
      'no-duplicate-imports': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      
      // Performance and algorithm-focused rules
      'no-constant-condition': 'off', // Sometimes useful in competitive programming
      'no-empty': 'warn',
      'no-extra-semi': 'error',
      'no-func-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-obj-calls': 'error',
      'no-sparse-arrays': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      
      // Style rules handled by Prettier
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  prettierConfig,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.config.js',
      'bun.lockb',
    ],
  },
];
