import process from 'node:process'
import log from 'electron-log'
import type { MainLogger, NodeLogger, RendererLogger } from 'electron-log'
import { normalizeConfig, resolveConfigSync } from './config'
import type { LogOptions } from './type'

export default function (logger: MainLogger | RendererLogger | NodeLogger | undefined) {
  if (logger && logger.variables.processType === 'main') {
    const config = normalizeConfig(resolveConfigSync({ cwd: process.cwd() }));

    (logger as MainLogger).initialize()

    if (config.size)
      (logger as MainLogger).transports.file.maxSize = config.size

    if (config.resolvePathFn)
      (logger as MainLogger).transports.file.resolvePathFn = config.resolvePathFn

    if (config.archiveLogFn)
      (logger as MainLogger).transports.file.archiveLogFn = config.archiveLogFn

    return logger
  }
  else {
    return log
  }
}

export function defineConfig(config: Partial<LogOptions>) {
  return config
}
