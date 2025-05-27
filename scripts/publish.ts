import { resolve } from 'node:path'

import minimist from 'minimist'
import { logger, publish } from '@vexip-ui/scripts'
import { rootDir } from './constant'

const args = minimist<{
  d?: boolean,
  dry?: boolean,
  t?: string,
  tag?: string
}>(process.argv.slice(2))

const target = args._[0]
const isDryRun = args.dry || args.d
const releaseTag = args.tag || args.t

async function main() {
  if (!target?.includes('@')) throw new Error('Invaild package!')

  const [pkgName] = target.split('@')

  await publish({ pkgDir: resolve(rootDir, `packages/${pkgName}`), isDryRun, releaseTag })
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
