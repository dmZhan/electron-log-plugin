import type { MainLogger } from 'electron-log'
import { normalizeConfig, resolveConfigSync } from './config'
import type { LogOptions } from './type'

export default function (logger: MainLogger) {
  if (logger && process.type === 'browser') {
    const config = normalizeConfig(resolveConfigSync({ cwd: process.cwd() }))

    logger.initialize()

    if (config.size)
      logger.transports.file.maxSize = config.size

    if (config.resolvePathFn)
      logger.transports.file.resolvePathFn = config.resolvePathFn

    if (config.archiveLogFn)
      logger.transports.file.archiveLogFn = config.archiveLogFn
  }
}

export function defineConfig(config: Partial<LogOptions>) {
  return config
}
