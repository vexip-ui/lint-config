import fs from 'node:fs'
import minimist from 'minimist'
import semver from 'semver'
import prompts from 'prompts'
import { logger, run, dryRun, getPackageInfo } from './utils'

import type { ReleaseType } from 'semver'

const args = minimist<{
  d?: boolean,
  dry?: boolean,
  t?: string,
  tag?: string
}>(process.argv.slice(2))

const inputPkg = args._[0]
const isDryRun = args.dry || args.d
const releaseTag = args.tag || args.t

const runIfNotDry = isDryRun ? dryRun : run
const logStep = (msg: string) => logger.withStartLn(() => logger.infoText(msg))
const logSkipped = (msg = 'Skipped') => logger.warningText(`(${msg})`)

main().catch(error => {
  logger.error(error)
  process.exit(1)
})

async function main() {
  const {
    pkgName,
    pkgDir,
    pkgPath,
    pkg,
    currentVersion
  } = await getPackageInfo(inputPkg)
  const preId = args.preid || args.p || (semver.prerelease(currentVersion)?.[0])

  const versionIncrements: ReleaseType[] = [
    'patch',
    'minor',
    'major',
    ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] as const : [])
  ]

  const inc = (i: ReleaseType) => semver.inc(currentVersion, i, preId)

  const { release } = await prompts({
    type: 'select',
    name: 'release',
    message: 'Select release type:',
    choices: versionIncrements
      .map(i => `${i} (${inc(i)})`)
      .concat(['custom'])
      .map(i => ({ title: i, value: i }))
  })

  const version =
    release === 'custom'
      ? (await prompts({
          type: 'text',
          name: 'version',
          message: 'Input custom version:'
        })).version
      : release.match(/\((.*)\)/)![1]

  if (!semver.valid(version)) {
    throw new Error(`Invalid target version: ${version}`)
  }

  const tag = `${pkgName}@${version}`

  const { confirm } = await prompts([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Confirm release ${tag}?`
    }
  ])

  if (!confirm) return

  // 执行单元测试
  logStep('Running test...')

  if (!isDryRun) {
    await run('pnpm', ['test'])
  } else {
    logSkipped()
  }

  logStep('Updating version...')

  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

  // 构建库
  logStep('Building package...')

  if (!isDryRun) {
    await run('pnpm', ['build'])
  } else {
    logSkipped()
  }

  // 更新 Change Log
  logStep('Updating changelog...')

  await run('pnpm', ['changelog'])

  // 提交改动
  logStep('Comitting changes...')

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })

  if (stdout) {
    await runIfNotDry('git', ['add', '-A'])
    await runIfNotDry('git', ['commit', '-m', `release(${pkgName}): v${version}`])
    await runIfNotDry('git', ['tag', tag])
  } else {
    logSkipped('No changes to commit')
  }

  // 发布
  logStep('Publishing package...')

  const publishArgs = [
    'publish',
    '--access',
    'public',
    '--registry',
    'https://registry.npmjs.org/',
    '--no-git-checks'
  ]

  if (isDryRun) {
    publishArgs.push('--dry-run')
  }

  if (releaseTag) {
    publishArgs.push('--tag', releaseTag)
  }

  try {
    await run('pnpm', publishArgs, { stdio: 'pipe', cwd: pkgDir })
    logger.successText(`Successfully published v${version}'`)
  } catch (err: any) {
    if (err.stderr?.match(/previously published/)) {
      logger.errorText(`Skipping already published v'${version}'`)
    } else {
      throw err
    }
  }

  // 推送到远程仓库
  logStep('Pushing to Remote Repository...')

  await runIfNotDry('git', ['push', 'origin', `refs/tags/${tag}`])
  await runIfNotDry('git', ['push'])

  logger.withBothLn(() => {
    if (isDryRun) {
      logger.success('Dry run finished - run git diff to see package changes')
    } else {
      logger.success('Release successfully')
    }
  })
}
