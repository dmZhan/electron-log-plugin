import os from 'node:os'
import process from 'node:process'
import path from 'node:path'
import electron from 'electron'
import { findAndReadPackageJson } from './packageJson'

export function getAppLogPath(appName = getAppName()) {
  if (process.platform === 'darwin')
    return path.join(getSystemPathHome()!, 'Library/Logs', appName)

  return path.join(getAppUserDataPath(appName)!, 'logs')
}

export function getAppName() {
  let appName = ''

  try {
    appName = electron.app.name || electron.app.getName()
  }
  catch {

  }

  return appName || findAndReadPackageJson().name
}

export function getAppUserDataPath(appName = getAppName()) {
  return appName
    ? path.join(getSystemPathAppData(), appName)
    : undefined
}

function getSystemPathAppData() {
  const home = getSystemPathHome()

  switch (process.platform) {
    case 'darwin': {
      return path.join(home!, 'Library/Application Support')
    }

    case 'win32': {
      return process.env.APPDATA || path.join(home!, 'AppData/Roaming')
    }

    default: {
      return process.env.XDG_CONFIG_HOME || path.join(home!, '.config')
    }
  }
}

function getSystemPathHome() {
  return os.homedir?.() || process.env.HOME
}
