import { describe, expect, it } from 'vitest'
import { getElectronLogVersion, getOsVersion, getPackageDep, isLinux, isMacOs, isWindows, parsePackageVersion } from '../src/utils'

describe('utils', () => {
  it('getOsVersion', () => {
    expect(getOsVersion()).toMatchInlineSnapshot(`"Windows NT 10.0.19044"`)
  })

  it('isWindows', () => {
    expect(isWindows()).toMatchInlineSnapshot(`true`)

    expect(isLinux()).toMatchInlineSnapshot(`false`)

    expect(isMacOs()).toMatchInlineSnapshot(`false`)
  })

  it('resolve package.json', async () => {
    const arr = await getPackageDep()

    expect(arr)
      .toMatchInlineSnapshot(`
        {
          "@antfu/eslint-config": "^2.6.2",
          "@antfu/ni": "^0.21.12",
          "@antfu/utils": "^0.7.7",
          "@dmzj/resolve-package-json": "0.0.1-beta.4",
          "@types/node": "^20.11.16",
          "@types/semver": "^7.5.6",
          "bumpp": "^9.2.1",
          "electron": "*",
          "electron-log": "^5.1.0",
          "eslint": "^8.56.0",
          "esno": "^4.0.0",
          "fast-glob": "^3.3.2",
          "lint-staged": "^15.2.0",
          "pnpm": "^8.14.0",
          "rimraf": "^5.0.5",
          "semver": "^7.6.0",
          "simple-git-hooks": "^2.9.0",
          "typescript": "^5.3.3",
          "unbuild": "^2.0.0",
          "unconfig": "^0.3.11",
          "vite": "^5.0.11",
          "vitest": "^1.1.3",
        }
      `)
  })

  it('getElectronLogVersion', async () => {
    expect(await getElectronLogVersion()).toMatchInlineSnapshot(`"^5.1.0"`)
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
