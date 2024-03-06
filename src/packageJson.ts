import path from 'node:path'
import fs from 'node:fs'
import process from 'node:process'

export function findAndReadPackageJson() {
  return tryReadJsonAt(getMainModulePath())
    || tryReadJsonAt(extractPathFromArgs())
    || tryReadJsonAt(process.resourcesPath, 'app.asar')
    || tryReadJsonAt(process.resourcesPath, 'app')
    || tryReadJsonAt(process.cwd())
    || { name: undefined, version: undefined }
}

export function tryReadJsonAt(...searchPaths: Array<null | undefined | string>) {
  if (!searchPaths[0])
    return undefined

  try {
    const searchPath = path.join(...searchPaths as string[])
    const fileName = findUp('package.json', searchPath)
    if (!fileName)
      return undefined

    const json = JSON.parse(fs.readFileSync(fileName, 'utf8'))
    const name = json?.productName || json?.name
    if (!name || name.toLowerCase() === 'electron')
      return undefined

    if (name)
      return { name, version: json?.version }

    return undefined
  }
  catch (e) {
    return undefined
  }
}

function findUp(fileName: string, cwd: string) {
  let currentPath = cwd

  while (true) {
    const parsedPath = path.parse(currentPath)
    const root = parsedPath.root
    const dir = parsedPath.dir

    if (fs.existsSync(path.join(currentPath, fileName)))
      return path.resolve(path.join(currentPath, fileName))

    if (currentPath === root)
      return null

    currentPath = dir
  }
}

function extractPathFromArgs() {
  const matchedArgs = process.argv.filter((arg) => {
    return arg.indexOf('--user-data-dir=') === 0
  })

  if (matchedArgs.length === 0 || typeof matchedArgs[0] !== 'string')
    return null

  const userDataDir = matchedArgs[0]
  return userDataDir.replace('--user-data-dir=', '')
}

function getMainModulePath() {
  try {
    // Requires isn't available in ESM
    return require.main?.filename
  }
  catch {
    return undefined
  }
}
