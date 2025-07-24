import eslint from '@eslint/js'
import vuePlugin from 'eslint-plugin-vue'
import reactPlugin from 'eslint-plugin-react'
import jsoncPlugin from 'eslint-plugin-jsonc'
import ymlPlugin from 'eslint-plugin-yml'
import markdownPlugin from 'eslint-plugin-markdown'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import stylistic from '@stylistic/eslint-plugin'

import type { Linter } from 'eslint'

export interface FactoryOptions {
  ignores?: string[]
}

function factory({ ignores = [] }: FactoryOptions = {}) {
  return tseslint.config(
    {
      ignores: [
        '**/node_modules',
        '**/dist',
        '**/public',
        '**/package-lock.json',
        '**/yarn.lock',
        '**/pnpm-lock.yaml',
        '**/bun.lockb',

        '**/output',
        '**/coverage',
        '**/temp',
        '**/.temp',
        '**/tmp',
        '**/.tmp',
        '**/.history',
        '**/.vitepress/cache',
        '**/.nuxt',
        '**/.next',
        '**/.svelte-kit',
        '**/.vercel',
        '**/.changeset',
        '**/.idea',
        '**/.cache',
        '**/.output',
        '**/.vite-inspect',
        '**/.yarn',
        '**/vite.config.*.timestamp-*',

        '**/CHANGELOG*.md',
        '**/*.min.*',
        '**/LICENSE*',
        '**/__snapshots__',
        '**/auto-import?(s).d.ts',
        '**/components.d.ts',

        '**/*.md/*.md',

        ...ignores,
      ],
    },
    {
      extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...vuePlugin.configs['flat/recommended'],
      ],
      files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,vue}'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: globals.browser,
        parserOptions: {
          parser: tseslint.parser,
          ecmaVersion: 'latest',
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: {
        '@stylistic': stylistic,
        '@typescript-eslint': tseslint.plugin,
        import: importPlugin,
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.mts', '.ts', '.tsx', '.mjs', '.js', '.jsx', '.json', '.node'],
          },
        },
      },
      rules: {
        'no-console': [
          process.env.NODE_ENV === 'production' ? 'error' : 'warn',
          {
            allow: ['info', 'warn', 'error'],
          },
        ],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-return-assign': 'off',
        'no-sparse-arrays': 'off',
        'no-empty': ['error', { allowEmptyCatch: true }],

        'import/no-mutable-exports': 'error',
        'import/order': [
          'error',
          {
            groups: [
              'unknown',
              ['builtin', 'external', 'internal', 'parent', 'index', 'sibling', 'object'],
              'type',
            ],
            pathGroups: [
              {
                pattern: '**/*.{css,scss,sass,less,styl,stylus,json,xml}',
                group: 'unknown',
                position: 'before',
              },
              {
                pattern: '{node:*,node:**/*}',
                group: 'builtin',
                position: 'before',
              },
              {
                pattern: '{vitest,vue,vue-router,pinia,vuex,vue-i18n,axios,@vue/*}',
                group: 'external',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['unknown', 'type'],
            'newlines-between': 'always-and-inside-groups',
            warnOnUnassignedImports: false,
          },
        ],
        'sort-imports': [
          'error',
          {
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            allowSeparatedGroups: false,
          },
        ],

        '@stylistic/indent': ['error', 2],
        '@stylistic/space-before-function-paren': [
          'error',
          {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always',
          },
        ],
        '@stylistic/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'comma',
              requireLast: false,
            },
            singleline: {
              delimiter: 'comma',
              requireLast: false,
            },
          },
        ],
        '@stylistic/comma-dangle': ['error', 'always-multiline'],

        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: false,
            classes: false,
            variables: true,
            enums: false,
            typedefs: false,
          },
        ],
        
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-this-alias': [
          'error',
          {
            allowDestructuring: true,
          },
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
            disallowTypeAnnotations: false,
          },
        ],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            caughtErrors: 'none',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
          },
        ],
        '@typescript-eslint/no-empty-object-type': 'off',

        'vue/eqeqeq': 'error',
        'vue/object-curly-spacing': ['error', 'always'],
        'vue/require-direct-export': 'error',
        'vue/no-parsing-error': [
          'error',
          {
            'x-invalid-end-tag': false,
          },
        ],
        'vue/max-attributes-per-line': [
          'warn',
          {
            singleline: 3,
            multiline: 1,
          },
        ],
        'vue/match-component-file-name': [
          'error',
          {
            extensions: ['vue'],
            shouldMatchCase: false,
          },
        ],
        'vue/space-infix-ops': [
          'error',
          {
            int32Hint: false,
          },
        ],
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always',
              normal: 'never',
              component: 'never',
            },
            svg: 'always',
            math: 'always',
          },
        ],
        'vue/no-reserved-component-names': 'off',
        'vue/comment-directive': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-setup-props-destructure': 'off',
        'vue/require-default-prop': 'off',
        'vue/padding-line-between-blocks': ['error', 'always'],
      },
    },
    {
      files: ['**/*.{jsx,tsx,vue}'],
      plugins: {
        react: reactPlugin,
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          ...globals.browser,
        },
      },
      rules: {
        'react/self-closing-comp': 'off',
        'react/jsx-key': 'off',
        'react/jsx-curly-brace-presence': [
          'error',
          {
            props: 'always',
            children: 'always',
            propElementValues: 'always',
          },
        ],
        'react/jsx-pascal-case': [
          'error',
          {
            allowAllCaps: true,
          },
        ],
        'react/jsx-closing-tag-location': 'off',
        'react/no-children-prop': 'off',
      },
    },
    {
      files: ['**/*.vue'],
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
      },
    },
    ...jsoncPlugin.configs['flat/recommended-with-jsonc'],
    {
      files: ['**/*.{json,jsonc}'],
      rules: {
        'jsonc/array-bracket-spacing': ['error', 'never'],
        'jsonc/comma-dangle': ['error', 'never'],
        'jsonc/comma-style': ['error', 'last'],
        'jsonc/indent': ['error', 2],
        'jsonc/key-spacing': ['error', { beforeColon: false, afterColon: true }],
        'jsonc/no-octal-escape': 'error',
        'jsonc/object-curly-newline': ['error', { multiline: true, consistent: true }],
        'jsonc/object-curly-spacing': ['error', 'always'],
        'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
      },
    },
    ...ymlPlugin.configs['flat/recommended'],
    {
      files: ['**/*.{yaml,yml}'],
      rules: {
        'spaced-comment': 'off',
      },
    },
    markdownPlugin.configs.recommended,
    {
      // Code blocks in markdown file
      files: ['**/*.md/**/*.{js,jsx,mjs,cjs,ts,tsx,vue}'],
      rules: {
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        'import/no-unresolved': 'off',
        'no-alert': 'off',
        'no-console': 'off',
        'no-restricted-imports': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
      },
    },
  ) as Linter.Config[]
}

export default factory
