module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'standard',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:yml/standard',
    'plugin:markdown/recommended',
    '@vue/typescript/recommended'
  ],
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  reportUnusedDisableDirectives: true,
  rules: {
    'no-console':
      process.env.NODE_ENV === 'production'
        ? [
            'error',
            {
              allow: ['warn', 'error']
            }
          ]
        : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-return-assign': 'off',
    'no-use-before-define': 'off',
    'space-before-function-paren': 'off',

    // typescript
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: true
      }
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'comma',
          requireLast: false
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true
      }
    ],
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: false
      }
    ],
    '@typescript-eslint/ban-ts-comment': 'off',

    // vue
    'vue/eqeqeq': 'error',
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/require-direct-export': 'error',
    'vue/no-parsing-error': [
      'error',
      {
        'x-invalid-end-tag': false
      }
    ],
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 3,
        multiline: 1
      }
    ],
    'vue/match-component-file-name': [
      'error',
      {
        extensions: ['vue'],
        shouldMatchCase: false
      }
    ],
    'vue/space-infix-ops': [
      'error',
      {
        int32Hint: false
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'never'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/no-reserved-component-names': 'off',
    'vue/comment-directive': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-setup-props-destructure': 'off',
    'vue/require-default-prop': 'off'
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/consistent-type-imports': 'off'
      }
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
      }
    },
    {
      files: ['*.json', '*.json5'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/array-bracket-spacing': ['error', 'never'],
        'jsonc/comma-dangle': ['error', 'never'],
        'jsonc/comma-style': ['error', 'last'],
        'jsonc/indent': ['error', 2],
        'jsonc/key-spacing': [
          'error',
          { beforeColon: false, afterColon: true }
        ],
        'jsonc/no-octal-escape': 'error',
        'jsonc/object-curly-newline': [
          'error',
          { multiline: true, consistent: true }
        ],
        'jsonc/object-curly-spacing': ['error', 'always'],
        'jsonc/object-property-newline': [
          'error',
          { allowMultiplePropertiesPerLine: true }
        ]
      }
    },
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      rules: {
        'spaced-comment': 'off'
      }
    },
    {
      // Code blocks in markdown file
      files: ['**/*.md/*.*'],
      rules: {
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        'import/no-unresolved': 'off',
        'no-alert': 'off',
        'no-console': 'off',
        'no-restricted-imports': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off'
      }
    }
  ],
  ignorePatterns: [
    '*.min.*',
    '*.log',
    '*.svg',
    '.env.*',
    'CHANGELOG.md',
    'dist',
    'LICENSE*',
    'output',
    'coverage',
    'public',
    'temp',
    'node_modules',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    '.husky',
    '!.github',
    '!.vitepress',
    '!.vscode'
  ]
}
