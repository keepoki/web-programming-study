import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@tanstack/query': pluginQuery,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@tanstack/query/exhaustive-deps': 'warn',
      // 사용하지 않는 변수에 대한 경고를 무시
      'no-unused-vars': 'off', // 또는 'warn'으로 설정하여 경고로 변경
      // TypeScript의 경우
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 언더스코어로 시작하는 인자는 무시
    },
  },
)
