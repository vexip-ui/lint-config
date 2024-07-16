import minimist from 'minimist'
import semver from 'semver'
import { logger, release, run } from '@vexip-ui/scripts'

import { getPackageInfo } from './utils'

const args = minimist<{
  d?: boolean,
  dry?: boolean,
  t?: string,
  tag?: string
}>(process.argv.slice(2))

const inputPkg = args._[0]
const isDryRun = args.dry || args.d

async function main() {
  const { pkgName, pkgDir, pkg, currentVersion } = await getPackageInfo(inputPkg)
  const preId = args.preid || args.p || semver.prerelease(currentVersion)?.[0]

  await release({
    pkgDir,
    isDryRun,
    preId,
    gitCommitScope: pkgName,
    runBuild: async () => {
      if (pkg.scripts?.build) {
        await run('pnpm', ['build'], { cwd: pkgDir })
      }
    },
    runChangelog: async () => {
      const changelogArgs = [
        'conventional-changelog',
        '-p',
        'angular',
        '-i',
        'CHANGELOG.md',
        '-s',
        '--commit-path',
        '.',
        '--lerna-package',
        pkgName
      ]

      await run('npx', changelogArgs, { cwd: pkgDir })
    }
  })
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
