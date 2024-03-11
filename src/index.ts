import process from 'node:process'
import MainLog from 'electron-log/main'
import RendererLog from 'electron-log/renderer'
import NodeLog from 'electron-log/node'

import { isMain, isRenderer } from './is'
import type { LogOptions } from './type'
import { normalizeConfig, resolveConfigSync } from './config'

// import { getElectronLogVersion } from './utils'

const log = function (
  { cwd = process.cwd() } = {},
) {
  if (isRenderer)
    return RendererLog

  if (isMain) {
    const config = normalizeConfig(resolveConfigSync({ cwd }))

    // console.log(`Now electron-log version is ${await getElectronLogVersion()}`)

    MainLog.initialize()

    if (config.size)
      MainLog.transports.file.maxSize = config.size

    if (config.resolvePathFn)
      MainLog.transports.file.resolvePathFn = config.resolvePathFn

    if (config.archiveLogFn)
      MainLog.transports.file.archiveLogFn = config.archiveLogFn

    return MainLog
  }
  else { return NodeLog }
}

export default log

export function defineConfig(config: Partial<LogOptions>) {
  return config
}
