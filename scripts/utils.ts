import { resolve } from 'node:path'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import prompts from 'prompts'

export const rootDir = resolve(fileURLToPath(import.meta.url), '../..')
export const pkgNames = readdirSync(resolve(rootDir, 'packages')).filter(f => {
  const path = resolve(rootDir, 'packages', f)

  return statSync(path).isDirectory() && existsSync(`${path}/package.json`)
})

export async function getPackageInfo(inputPkg: string) {
  let pkgName: string | null = null

  if (pkgNames.includes(inputPkg)) {
    pkgName = inputPkg
  } else {
    let options = inputPkg ? pkgNames.filter(p => p.includes(inputPkg)) : pkgNames

    if (!options.length) {
      options = pkgNames
    } else if (options.length === 1) {
      pkgName = options[0]
    } else {
      pkgName = (
        await prompts({
          type: 'select',
          name: 'pkgName',
          message: 'Select release package:',
          choices: options.map(n => ({ title: n, value: n })),
        })
      ).pkgName
    }
  }

  if (!pkgName) {
    throw new Error('Release package must not be null')
  }

  const pkgDir = resolve(rootDir, `packages/${pkgName}`)
  const pkgPath = resolve(pkgDir, 'package.json')

  if (!existsSync(pkgPath)) {
    throw new Error(`Release package ${pkgName} not found`)
  }

  const rawPkg = readFileSync(pkgPath, 'utf-8')
  const pkg = JSON.parse(rawPkg)

  if (pkg.private) {
    throw new Error(`Release package ${pkgName} is private`)
  }

  return {
    pkgName,
    pkgDir,
    pkgPath,
    pkg,
    currentVersion: pkg.version,
  }
}
