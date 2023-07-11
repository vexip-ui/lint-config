module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-html',
    'stylelint-config-recommended-vue',
    'stylelint-config-recess-order'
  ],
  plugins: ['stylelint-order'],
  rules: {
    'no-empty-source': process.env.NODE_ENV === 'production' ? true : null,
    'block-no-empty': process.env.NODE_ENV === 'production' ? true : null,
    'at-rule-no-unknown': null,
    'at-rule-no-vendor-prefix': true,
    'declaration-property-value-disallowed-list': {
      '/^transition/': ['/all/'],
      '/^background/': ['http:', 'https:'],
      '/^border/': ['none'],
      '/.+/': ['initial']
    },
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: [
          'after-comment',
          'blockless-after-same-name-blockless',
          'blockless-after-blockless'
        ],
        ignoreAtRules: ['else']
      }
    ],
    'no-descending-specificity': null,
    'custom-property-empty-line-before': null,
    'selector-class-pattern': [
      '^([#a-z][$#{}a-z0-9]*)((-{1,2}|_{2})[$#{}a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case'
      }
    ],
    'keyframes-name-pattern': [
      '^([#a-z][$#{}a-z0-9]*)((-{1,2}|_{2})[$#{}a-z0-9]+)*$',
      {
        message: 'Expected keyframe name to be kebab-case'
      }
    ],
    'color-function-notation': null,
    'function-no-unknown': null,
    'alpha-value-notation': 'percentage',
    'annotation-no-unknown': [
      true,
      {
        ignoreAnnotations: ['default', 'global']
      }
    ],
    'scss/at-import-partial-extension': 'always',
    'scss/dollar-variable-empty-line-before': null,
    'scss/operator-no-newline-after': null
  },
  overrides: [
    {
      files: ['*.scss'],
      rules: {
        'media-query-no-invalid': null
      }
    }
  ],
  ignoreFiles: [
    'node_modules',
    'dist',
    'public',
    'output',
    'coverage',
    'temp',
    '*.js',
    '*.cjs',
    '*.mjs',
    '*.ts',
    '*.tsx',
    '*.svg',
    '*.gif',
    '*.md'
  ]
}
