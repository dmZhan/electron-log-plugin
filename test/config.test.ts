import { describe, expect, it } from 'vitest'
import {
  normalizeConfig,
  resolveConfig,
} from '../src/config'
import type { LogOptions } from '../src/type'
import { generateValidFilePath } from '../src/logPath'

describe('load config', () => {
  describe('resolveConfig', () => {
    it('cwd path: ./configs', async () => {
      expect(await resolveConfig({
        cwd: './test/configs',
      })).toMatchInlineSnapshot(`
        {
          "path": "/usr/bin",
        }
      `)
    })

    it('default cwd', async () => {
      expect(await resolveConfig()).toMatchInlineSnapshot(`{}`)
    })
  })

  describe('normalizeConfig', () => {
    describe.skip('in windows', () => {
      it('only path', async () => {
        expect((await normalizeConfig({
          path: 'D:\\aaa\\bbb',
        })).resolvePathFn?.toString()).toMatchInlineSnapshot(`undefined`)
      })

      it('only resolvePathFn', async () => {
        expect((await normalizeConfig({
          resolvePathFn: (variables, message) => {
            return `${variables.appName} ${variables.appVersion} ${message?.level}`
          },
        })).resolvePathFn?.toString()).toMatchInlineSnapshot(`
          "(variables, message) => {
                      return \`\${variables.appName} \${variables.appVersion} \${message?.level}\`;
                    }"
        `)
      })

      it('both path and resolvePathFn', async () => {
        const options: Partial<LogOptions> = {
          path: 'D:\\aaa\\bbb',

          resolvePathFn: (variables, message) => {
            return `${variables.appName} ${variables.appVersion} ${message?.level}`
          },
        }
        expect((await normalizeConfig(options)).resolvePathFn?.toString()).toMatchInlineSnapshot(`
          "(variables, message) => {
                      return \`\${variables.appName} \${variables.appVersion} \${message?.level}\`;
                    }"
        `)
      })
    })

    describe.skip('in Linux or MacOs', () => {
      it('only path', async () => {
        expect((await normalizeConfig({
          path: '/aaa/bbb',
        })).resolvePathFn?.toString()).toMatchInlineSnapshot(`"() => logPath"`)
      })

      it('only resolvePathFn', async () => {
        expect((await normalizeConfig({
          resolvePathFn: (variables, message) => {
            return `${variables.appName} ${variables.appVersion} ${message?.level}`
          },
        })).resolvePathFn?.toString()).toMatchInlineSnapshot(`
          "(variables, message) => {
                      return \`\${variables.appName} \${variables.appVersion} \${message?.level}\`;
                    }"
        `)
      })

      it('both path and resolvePathFn', async () => {
        const options: Partial<LogOptions> = {
          path: '/aaa/bbb',

          resolvePathFn: (variables, message) => {
            return `${variables.appName} ${variables.appVersion} ${message?.level}`
          },
        }
        expect((await normalizeConfig(options)).resolvePathFn?.toString()).toMatchInlineSnapshot(`"() => logPath"`)
      })
    })

    it('empty config', async () => {
      expect(await normalizeConfig({})).toMatchInlineSnapshot(`{}`)
    })

    it('has path or resolvePathFn', async () => {
      const config = await resolveConfig()
      expect(config).toMatchInlineSnapshot(`{}`)
      expect(await normalizeConfig(config)).toMatchInlineSnapshot(`{}`)

      expect(generateValidFilePath(
        'C:/usr\\logs',
        [
          '',
        ],
        'SMSLog-',
      ))
        .toMatchInlineSnapshot(`
          [
            "C:/usr/logs",
            "SMSLog-",
            "log",
          ]
        `)

      expect(generateValidFilePath(undefined, undefined, undefined))
        .toMatchInlineSnapshot(`
          [
            "C:\\Users\\Administrator\\AppData\\Roaming\\@dmzj\\electron-log-plugin\\logs",
            "@dmzj/electron-log-plugin",
            "log",
          ]
        `)

      expect(generateValidFilePath('C:/use/lo/a.log', undefined, undefined))
        .toMatchInlineSnapshot(`
          [
            "C:/use/lo",
            "a",
            "log",
          ]
        `)

      expect(generateValidFilePath('C:/use/lo', undefined, undefined))
        .toMatchInlineSnapshot(`
          [
            "C:/use/lo",
            "@dmzj/electron-log-plugin",
            "log",
          ]
        `)
    })
  })
})
