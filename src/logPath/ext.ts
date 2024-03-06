import path from 'node:path'
import type { logExt } from '../type'
import { regexLogPath } from './valid'

const ext = [
  'log',
  'txt',
]

export function isValidLogPath(p: string, fileExt: logExt): { dir: string | null, base: string | null } {
  if (regexLogPath(p)) {
    p = regexLogPath(p)!

    const parseArr = path.parse(p)

    if (parseArr.ext && isValidLogExt(parseArr.ext, fileExt)) {
      return {
        dir: parseArr.dir,
        base: parseArr.base,
      }
    }
    else {
      return {
        dir: p,
        base: null,
      }
    }
  }
  else {
    return {
      dir: null,
      base: null,
    }
  }
}

export function isValidLogExt(ext: string, fileExt: logExt) {
  const extArr = validLogExtArr(fileExt)
  const extName = ext.slice(1)

  if (extArr.includes(extName))
    return true

  return false
}

export function validLogExtArr(fileExt: logExt) {
  if (fileExt) {
    if (typeof fileExt === 'string') {
      if (/^[a-z]+$/.test(fileExt))
        return [...ext, fileExt]
      else
        return ext
    }
    else {
      const tem: string[] = []

      fileExt.forEach((e) => {
        if (e && /^[a-z]+$/.test(e))
          tem.push(e)
      })

      return [...ext, ...tem]
    }
  }
  else {
    return ext
  }
}
