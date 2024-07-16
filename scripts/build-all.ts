import { resolve } from 'node:path'

import { logger, run } from '@vexip-ui/scripts'
import { pkgNames, rootDir } from './utils'

async function main() {
  await Promise.all(
    pkgNames.map(async pkgName => {
      const pkgDir = resolve(rootDir, `packages/${pkgName}`)

      return run('pnpm', ['build'], { cwd: pkgDir, stdio: 'pipe' })
    })
  )
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
