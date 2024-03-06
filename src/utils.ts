import os from 'node:os'
import resolveJson from '@dmzj/resolve-package-json'

function getMacOsVersion() {
  const release = Number(os.release().split('.')[0])
  if (release <= 19)
    return `10.${release - 4}`

  return `release - 9`
}

export function getOsVersion() {
  let osName = os.type().replace('_', ' ')
  let osVersion = os.release()

  if (osName === 'Darwin') {
    osName = 'macOS'
    osVersion = getMacOsVersion()
  }

  return `${osName} ${osVersion}`
}

export function isWindows() {
  return os.type().includes('Windows_NT')
}

export function isLinux() {
  return os.type().includes('Linux')
}

export function isMacOs() {
  return os.type().includes('Darwin')
}

/**
 * Get package dependencies from your repo.
 * @returns Promise<{}>
 */
export async function getPackageDep<T extends Record<string, any>>() {
  const arr = await resolveJson<T>()

  return { ...arr.dependencies, ...arr.devDependencies }
}

export async function getElectronLogVersion() {
  const { 'electron-log': el }: { 'electron-log'?: string } = await getPackageDep()
  // const root = cwd()
  return el
}
/**
 * To parse electron-log version.
 * like:
 *  version template 1 : *.*.*
 *  version template 2 : *.*.*-beta.*
 *  version template 3 : *.*.*-rc.*
 *  version template 4 : *.*.*-beta*
 *  version template 4 : *.*.*-rc*
 * @param str {String} version string
 * @returns string
 */
export function parsePackageVersion(str: string) {
  const reg: RegExp = /^(\^|~)?(\d+\.\d+\.\d+)(-((rc|beta)\.?\d+))?$/
  const res = str.match(reg)
  if (res)
    return res[2]

  return ''
}

export function findMaxNum(arr: Array<number>) {
  return arr.length ? arr.reduce((a, b) => a > b ? a : b) : null
}
