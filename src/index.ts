import process from 'node:process'
import type {
  MainLogger,
  NodeLogger,
  RendererLogger,
  Variables,
} from 'electron-log'
import type { LogOptions } from './type'
import { normalizeConfig, resolveConfig } from './config'
import { getElectronLogVersion } from './utils'

export async function unLogger(
  logger: MainLogger | RendererLogger | NodeLogger,
  { cwd = process.cwd() } = {},
) {
  const config = await normalizeConfig(await resolveConfig({ cwd }))

  // eslint-disable-next-line no-console
  console.log(`Now electron-log version is ${await getElectronLogVersion()}`)

  if ((logger.variables as Variables).processType === 'main') {
    (logger as MainLogger).initialize()

    if (config.size)
      (logger as MainLogger).transports.file.maxSize = config.size

    if (config.resolvePathFn)
      (logger as MainLogger).transports.file.resolvePathFn = config.resolvePathFn

    if (config.archiveLogFn)
      (logger as MainLogger).transports.file.archiveLogFn = config.archiveLogFn
  }

  if ((logger.variables as Variables).processType === 'renderer') {
    // eslint-disable-next-line no-console
    console.log('renderer')
  }

  if ((logger.variables as Variables).processType === 'browser') {
    // eslint-disable-next-line no-console
    console.log('browser')
  }

  // Object.assign(logger, config)

  return logger
}

export function defineConfig(config: Partial<LogOptions>) {
  return config
}
