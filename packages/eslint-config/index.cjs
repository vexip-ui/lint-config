const configStandard = require('eslint-config-standard/.eslintrc.json')
const { defineConfig } = require('eslint-define-config')
const equivalents = [
  'indent',
  'no-unused-vars',
  'no-redeclare',
  'no-use-before-define',
  'brace-style',
  'comma-dangle',
  'object-curly-spacing',
  'semi',
  'quotes',
  'space-before-blocks',
  'space-before-function-paren',
  'space-infix-ops',
  'keyword-spacing',
  'comma-spacing',
  'no-extra-parens',
  'no-dupe-class-members',
  'no-loss-of-precision',
  'lines-between-class-members',
  'func-call-spacing',
  'no-array-constructor',
  'no-unused-expressions',
  'no-useless-constructor'
]

function fromEntries(iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val
    return obj
  }, {})
}

function ruleFromStandard(name) {
  const rule = configStandard.rules[name]

  return rule || 'off'
}

/**
 * @type  {import('eslint-define-config').Rules}
 */
const typeScriptRules = {
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

  'import/no-mutable-exports': 'error',
  'import/order': [
    'error',
    {
      groups: [
        'unknown',
        ['builtin', 'external', 'internal', 'parent', 'index', 'sibling', 'object'],
        'type'
      ],
      pathGroups: [
        {
          pattern: '**/*.{css,scss,sass,less,styl,stylus,json,xml}',
          group: 'unknown',
          position: 'before'
        },
        {
          pattern: '{node:*,node:**/*}',
          group: 'builtin',
          position: 'before'
        },
        {
          pattern: '{vitest,vue,vue-router,pinia,vuex,vue-i18n,axios,@vue/*}',
          group: 'external',
          position: 'before'
        }
      ],
      pathGroupsExcludedImportTypes: ['unknown', 'type'],
      'newlines-between': 'always-and-inside-groups',
      warnOnUnassignedImports: false
    }
  ],
  'sort-imports': [
    'error',
    {
      ignoreCase: false,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      allowSeparatedGroups: false
    }
  ],

  ...fromEntries(equivalents.map(name => [name, 'off'])),
  ...fromEntries(equivalents.map(name => [`@typescript-eslint/${name}`, ruleFromStandard(name)])),

  '@typescript-eslint/indent': [
    'error',
    2,
    {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      MemberExpression: 1,
      FunctionDeclaration: { parameters: 1, body: 1 },
      FunctionExpression: { parameters: 1, body: 1 },
      CallExpression: { arguments: 1 },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      ignoreComments: false,
      ignoredNodes: [
        'TemplateLiteral *',
        'JSXElement',
        'JSXElement > *',
        'JSXAttribute',
        'JSXIdentifier',
        'JSXNamespacedName',
        'JSXMemberExpression',
        'JSXSpreadAttribute',
        'JSXExpressionContainer',
        'JSXOpeningElement',
        'JSXClosingElement',
        'JSXFragment',
        'JSXOpeningFragment',
        'JSXClosingFragment',
        'JSXText',
        'JSXEmptyExpression',
        'JSXSpreadChild',
        'TSTypeParameterInstantiation',
        'FunctionExpression > .params[decorators.length > 0]',
        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
        'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key'
      ],
      offsetTernaryExpressions: true
    }
  ],
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
      variables: true,
      enums: false,
      typedefs: false
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
  '@typescript-eslint/array-type': 'off',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      args: 'after-used',
      argsIgnorePattern: '^_',
      caughtErrors: 'none',
      ignoreRestSiblings: true
    }
  ]
}

module.exports = defineConfig({
  extends: [
    'standard',
    'standard-jsx',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:yml/standard',
    'plugin:markdown/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended'
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
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.mts', '.ts', '.tsx', '.mjs', '.js', '.jsx', '.json', '.node']
      }
    }
  },
  rules: {
    ...typeScriptRules,

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
    'vue/require-default-prop': 'off',
    'vue/padding-line-between-blocks': ['error', 'always']
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // Need override for vue files, otherwise typescript rules will not effective
        ...typeScriptRules,
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/consistent-type-imports': 'off'
      }
    },
    {
      files: ['*.jsx', '*.tsx', '*.vue'],
      rules: {
        'no-sequences': 'off',
        'react/self-closing-comp': 'off',
        'react/jsx-key': [
          'error',
          {
            checkFragmentShorthand: false,
            checkKeyMustBeforeSpread: true,
            warnOnDuplicates: true
          }
        ],
        'react/jsx-curly-brace-presence': [
          'error',
          {
            props: 'always',
            children: 'always',
            propElementValues: 'always'
          }
        ],
        'react/jsx-pascal-case': [
          'error',
          {
            allowAllCaps: true
          }
        ],
        'react/jsx-closing-tag-location': 'off',
        'react/no-children-prop': 'off'
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
        'jsonc/key-spacing': ['error', { beforeColon: false, afterColon: true }],
        'jsonc/no-octal-escape': 'error',
        'jsonc/object-curly-newline': ['error', { multiline: true, consistent: true }],
        'jsonc/object-curly-spacing': ['error', 'always'],
        'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }]
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
})
