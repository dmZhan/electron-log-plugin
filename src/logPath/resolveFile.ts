import fg from 'fast-glob'
import { findMaxNum } from '../utils'

export async function findFiles(arr: [string, string, string]) {
  const p1 = `${arr[0]}/${arr[1]}-*.${arr[2]}`.replace(/\\/g, '/')
  const p2 = `${arr[0]}/${arr[1]}-`.replace(/\\/g, '/')
  const p3 = `.${arr[2]}`
  return (await fg.glob(p1)).map((i) => {
    return Number(i.split(p2)[1]?.split(p3)[0])
  })
}

export async function findLatestFile(arr: [string, string, string]): Promise<[string, number, string] | null> {
  const fileArr = await findFiles(arr)
  const num = findMaxNum(fileArr)

  return num ? [`${arr[0].replace(/\\/g, '/')}/${arr[1]}-`, num, `.${arr[2]}`] : null
}
