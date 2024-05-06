import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { findFiles, findLatestFile } from '../../src/logPath/resolveFile'
import { findMaxNum } from '../../src/utils'

describe('findFiles', () => {
  const arr1: [string, string, string] = [
    path.join(__dirname, '../files').replace(/\\/g, '/'),
    'SMSLog-2024-03-06',
    'log',
  ]
  const arr2: [string, string, string] = [
    path.join(__dirname, '../files').replace(/\\/g, '/'),
    'SMSLog-2024-03-05',
    'log',
  ]
  it('has files', async () => {
    expect(await findFiles(arr1)).toMatchInlineSnapshot(`[]`)
  })
  it('no files', async () => {
    expect(await findFiles(arr2)).toMatchInlineSnapshot(`[]`)
  })
  it('findMaxNum', () => {
    expect(findMaxNum([
      1,
      12,
      2,
      3,
      4,
      5,
      6,
      7,
    ])).toMatchInlineSnapshot(`12`)

    expect(findMaxNum([])).toMatchInlineSnapshot(`null`)
  })
  it('findLatestFile', async () => {
    expect(await findLatestFile(arr1)).toMatchInlineSnapshot(`null`)
    expect(await findLatestFile(arr2)).toMatchInlineSnapshot(`null`)
  })
})
