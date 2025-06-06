import type { Config } from 'prettier'
import * as packagejson from 'prettier-plugin-packagejson'

export default {
  plugins: [packagejson],
  printWidth: 100,
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'lf',
  bracketSameLine: false,
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  vueIndentScriptAndStyle: false,
  jsxSingleQuote: true,
  packageSortOrder: [
    'name',
    'version',
    'type',
    'packageManager',
    'license',
    'private',
    'author',
    'description',
    'scripts',
    'bin',
    'main',
    'module',
    'types',
    'exports',
    'sideEffects',
    'files',
    'engines',
    'keywords',
    'publishConfig',
    'repository',
    'bugs',
    'homepage',
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'peerDependenciesMeta',
    'optionalDependencies',
    'pnpm',
    'resolutions',
    'husky',
    'gitHooks',
    'lint-staged',
    'prettier',
    'eslintConfig'
  ],
  overrides: [
    {
      files: '*.md',
      options: {
        embeddedLanguageFormatting: 'off'
      }
    }
  ]
} satisfies Config
