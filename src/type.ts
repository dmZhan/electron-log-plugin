import type {
  ConsoleTransport,
  FileTransport,
  RemoteTransport,
} from 'electron-log'

// interface Transports {
//   console: ConsoleTransport
//   file: FileTransport
//   remote: RemoteTransport
// }

interface ColorType {
  [key: string]: string
}
export type logExt = string | string[] | undefined | null

// type fileNameFn = () => string

export interface LogOptions {
  levels: string[]
  fileExt: logExt
  console: Partial<ConsoleTransport>
  file: Partial<FileTransport>
  remote: Partial<RemoteTransport>
  overrideConsole: boolean
  colors: ColorType
  resolvePathFn: FileTransport['resolvePathFn']
  path: string
  fileName: string | undefined
  size: number
  archiveLogFn: FileTransport['archiveLogFn']
  fragment: boolean
}
