module.exports = {
  extends: ['./packages/eslint-config'],
  overrides: [
    {
      files: ['scripts/**'],
      rules: {
        'no-sequences': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
}
