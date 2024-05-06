import { describe, expect, it } from 'vitest'
import { getElectronLogVersion, getOsVersion, is, isLinux, isMacOs, isWindows, parsePackageVersion } from '../src/utils'

describe('utils', () => {
  it('isisiisi', async () => {
    expect(await is('electron')).toMatchInlineSnapshot(`true`)
    expect(await is('electron-log')).toMatchInlineSnapshot(`false`)
    expect(await is('electron-remote')).toMatchInlineSnapshot(`false`)

    expect(await is('@antfu/utils')).toMatchInlineSnapshot(`true`)
    expect(await is('vue')).toMatchInlineSnapshot(`false`)
  })

  it('getOsVersion', () => {
    expect(getOsVersion()).toMatchInlineSnapshot(`"macOS release - 9"`)
  })

  it('isWindows', () => {
    expect(isWindows()).toMatchInlineSnapshot(`false`)

    expect(isLinux()).toMatchInlineSnapshot(`false`)

    expect(isMacOs()).toMatchInlineSnapshot(`true`)
  })

  // it.skip('resolve package.json', async () => {
  //   const arr = await getPackageDep()

  //   expect(arr)
  //     .toMatchInlineSnapshot(`
  //       {
  //         "@antfu/eslint-config": "^2.6.2",
  //         "@antfu/ni": "^0.21.12",
  //         "@antfu/utils": "^0.7.7",
  //         "@dmzj/utils": "^0.0.3",
  //         "@types/node": "^20.11.16",
  //         "bumpp": "^9.2.1",
  //         "electron": "*",
  //         "eslint": "^8.56.0",
  //         "esno": "^4.0.0",
  //         "fast-glob": "^3.3.2",
  //         "lint-staged": "^15.2.0",
  //         "pnpm": "^8.14.0",
  //         "rimraf": "^5.0.5",
  //         "simple-git-hooks": "^2.9.0",
  //         "typescript": "^5.3.3",
  //         "unbuild": "^2.0.0",
  //         "unconfig": "^0.3.11",
  //         "vite": "^5.0.11",
  //         "vitest": "^1.1.3",
  //       }
  //     `)
  // })

  it('getElectronLogVersion', async () => {
    expect(await getElectronLogVersion()).toMatchInlineSnapshot(`"5.1.2"`)
  })

  it('parsePackageVersion', () => {
    const electron_log_version = '^5.1.0'

    expect(parsePackageVersion('5.1.0')).toMatchInlineSnapshot(`"5.1.0"`)

    expect(parsePackageVersion(electron_log_version)).toMatchInlineSnapshot(`"5.1.0"`)

    expect(parsePackageVersion('~5.1.0')).toMatchInlineSnapshot(`"5.1.0"`)

    expect(parsePackageVersion('5.1.0-beta.2')).toMatchInlineSnapshot(`"5.1.0"`)

    expect(parsePackageVersion('5.1.0-rc2')).toMatchInlineSnapshot(`"5.1.0"`)

    expect(parsePackageVersion('v3.0.0-beta10')).toMatchInlineSnapshot(`""`)

    expect(parsePackageVersion('10.0.01.0')).toMatchInlineSnapshot(`""`)
  })
})
