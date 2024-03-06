import process from 'node:process'
import { stat } from 'node:fs/promises'
import { loadConfig } from 'unconfig'
import type { FileTransport } from 'electron-log'
import type { LogOptions } from './type'
import { generateValidFilePath } from './logPath'
import { isWindows } from './utils'
import { findLatestFile } from './logPath/resolveFile'

export async function normalizeConfig(options: Partial<LogOptions>) {
  const p = generateValidFilePath(options.path, options.fileExt, options.fileName)
  let resolvePathFn: FileTransport['resolvePathFn'] | null = null
  let archiveLogFn: FileTransport['archiveLogFn'] | null = null

  if (!options.resolvePathFn && options.path) {
    if (options.fragment && options.size && options.size > 0) {
      const flf = await findLatestFile(p)
      let time = 1

      if (flf) {
        const s = flf ? await stat(flf.join('')) : null
        if (s && s.size > options.size)
          time = flf[1] + 1
        else
          time = flf[1]
      }

      archiveLogFn = () => {
        time += 1
      }
      resolvePathFn = () => {
        return `${p[0]}/${p[1]
       }-${
       time
       }.${
       p[2]}`
      }
    }
    else {
      resolvePathFn = () => {
        return `${p[0] + (isWindows() ? '\\' : '/') + p[1]}.${p[2]}`
      }
    }
  }

  if (archiveLogFn)
    options.archiveLogFn = archiveLogFn

  if (resolvePathFn)
    options.resolvePathFn = resolvePathFn

  return options
}

export async function resolveConfig({ cwd = process.cwd() } = {}): Promise<Partial<LogOptions>> {
  const { config } = await loadConfig({
    sources: [
      {
        files: [
          'log.config',
        ],
      },
      {
        files: [
          '.logrc',
        ],
        extensions: ['json', ''],
      },
    ],
    cwd,
    merge: false,
  })

  return config || {}
}
