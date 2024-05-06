import { describe, expect, it } from 'vitest'
import { isValidLogExt, isValidLogPath, validLogExtArr } from '../../src/logPath/ext'

describe('ext', () => {
  it('isValidLogPath', () => {
    expect(isValidLogPath('C:/usr/aaa', undefined)).toMatchInlineSnapshot(`
      {
        "base": null,
        "dir": null,
      }
    `)

    expect(isValidLogPath('C:/usr/aaa/a.log', undefined)).toMatchInlineSnapshot(`
      {
        "base": null,
        "dir": null,
      }
    `)

    expect(isValidLogPath('C:/usr/aaa/a.log.txt', undefined)).toMatchInlineSnapshot(`
      {
        "base": null,
        "dir": null,
      }
    `)

    expect(isValidLogPath('/usr/aaa', undefined)).toMatchInlineSnapshot(`
      {
        "base": null,
        "dir": "/usr/aaa",
      }
    `)

    expect(isValidLogPath('/usr/aaa/a.log', undefined)).toMatchInlineSnapshot(`
      {
        "base": "a.log",
        "dir": "/usr/aaa",
      }
    `)

    expect(isValidLogPath('/usr/aaa/a.log.txt', [''])).toMatchInlineSnapshot(`
      {
        "base": "a.log.txt",
        "dir": "/usr/aaa",
      }
    `)
    expect(isValidLogPath('/usr/aaa/a.log.aaa', ['aaa'])).toMatchInlineSnapshot(`
      {
        "base": "a.log.aaa",
        "dir": "/usr/aaa",
      }
    `)
    expect(isValidLogPath('/usr/aaa/a.log.bbb', ['aaa', 'bbb'])).toMatchInlineSnapshot(`
      {
        "base": "a.log.bbb",
        "dir": "/usr/aaa",
      }
    `)
    expect(isValidLogPath('/usr/aaa/a.log.bbb', ['aaa', ''])).toMatchInlineSnapshot(`
      {
        "base": null,
        "dir": "/usr/aaa/a.log.bbb",
      }
    `)
  })

  it('isValidLogExt', () => {
    expect(isValidLogExt('.test', 'test'))
      .toMatchInlineSnapshot(`true`)

    expect(isValidLogExt('.log', 'test'))
      .toMatchInlineSnapshot(`true`)

    expect(isValidLogExt('.txt', 'test'))
      .toMatchInlineSnapshot(`true`)

    expect(isValidLogExt('.test', ['test']))
      .toMatchInlineSnapshot(`true`)

    expect(isValidLogExt('.aa', undefined))
      .toMatchInlineSnapshot(`false`)
  })

  it('validLogExtArr', () => {
    expect(validLogExtArr('')).toMatchInlineSnapshot(`
        [
          "log",
          "txt",
        ]
      `)
    expect(validLogExtArr(null)).toMatchInlineSnapshot(`
        [
          "log",
          "txt",
        ]
      `)
    expect(validLogExtArr(undefined)).toMatchInlineSnapshot(`
        [
          "log",
          "txt",
        ]
      `)
    expect(validLogExtArr('aa')).toMatchInlineSnapshot(`
        [
          "log",
          "txt",
          "aa",
        ]
      `)
    expect(validLogExtArr('.skd')).toMatchInlineSnapshot(`
        [
          "log",
          "txt",
        ]
      `)
    expect(validLogExtArr(['aa'])).toMatchInlineSnapshot(`
        [
          "log",
          "txt",
          "aa",
        ]
      `)
    expect(validLogExtArr(['', 'aa'])).toMatchInlineSnapshot(`
        [
          "log",
          "txt",
          "aa",
        ]
      `)

    expect(validLogExtArr(['', 'aa', '.kks', 'sd-', '/s'])).toMatchInlineSnapshot(`
      [
        "log",
        "txt",
        "aa",
      ]
    `)

    expect(validLogExtArr(['a', 'g', '123'])).toMatchInlineSnapshot(`
      [
        "log",
        "txt",
        "a",
        "g",
      ]
    `)
  })
})
