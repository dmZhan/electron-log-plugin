import { isWindows } from '../utils'

export function regexLogPath(path: string | undefined) {
  if (isWindows())
    return regexLogPathInWindows(path)
  else
    return regexLogPathInLinOrMac(path)
}

export function regexLogPathInWindows(path: string | undefined) {
  if (path) {
    const reg = /^[a-zA-Z]:([/|\\{2}]([\u4E00-\u9FA5A-Za-z0-9_-\s\.]+))+[/|\\{2}]?$/

    if (reg.test(path))
      return path.replace(/\\/g, '/')
  }
}

export function regexLogPathInLinOrMac(path: string | undefined) {
  if (path) {
    const reg = /^(\/([\u4E00-\u9FA5A-Za-z0-9_-\s\.]+))+\/?$/

    if (reg.test(path))
      return path
  }
}
