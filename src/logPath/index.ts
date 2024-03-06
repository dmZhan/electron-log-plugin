import { getAppLogPath, getAppName } from '../electron'
import type { logExt } from '../type'
import { isValidLogPath } from './ext'
import { generateFileName } from './name'

/**
 * 返回一个数组，[日志路径，日志名称，日志后缀]
 * @param p
 * @param fileExt
 * @param fileName
 * @returns []
 */
export function generateValidFilePath(p: string | undefined, fileExt: logExt, fileName: string | undefined): [string, string, string] {
  let fileDir = ''
  let fileBase = ''

  if (p) {
    const { dir, base } = isValidLogPath(p, fileExt)

    fileBase = base || ''
    fileDir = dir || ''
  }

  if (!fileBase)
    fileBase = fileName ? generateFileName(fileName) : `${getAppName()}.log`

  if (!fileDir)
    fileDir = getAppLogPath()

  return [
    fileDir,
    fileBase.slice(0, fileBase.lastIndexOf('.')),
    fileBase.slice(fileBase.lastIndexOf('.') + 1),
  ]
}
