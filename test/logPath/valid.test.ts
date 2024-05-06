import { describe, expect, it } from 'vitest'
import {
  regexLogPath,
  regexLogPathInLinOrMac,
  regexLogPathInWindows,
} from '../../src/logPath/valid'

describe('valid', () => {
  it('regexLogPath', () => {
    expect(regexLogPath(undefined))
      .toMatchInlineSnapshot(`undefined`)

    expect(regexLogPath('123'))
      .toMatchInlineSnapshot(`undefined`)

    expect(regexLogPath('/aaa/ddd/sss'))
      .toMatchInlineSnapshot(`"/aaa/ddd/sss"`)

    expect(regexLogPath('/aaa\\ddd/sss'))
      .toMatchInlineSnapshot(`undefined`)

    expect(regexLogPath('D:/aaa\\ddd/sss\\eee'))
      .toMatchInlineSnapshot(`undefined`)
  })

  it('regexLogPathInWindows', () => {
    expect(regexLogPathInWindows('C:/Program Files/aaa\\bbb'))
      .toMatchInlineSnapshot(`"C:/Program Files/aaa/bbb"`)

    expect(regexLogPathInWindows('C:path\\to\\file.txt'))
      .toMatchInlineSnapshot(`undefined`)

    expect(regexLogPathInWindows('C:\\path\\to\\'))
      .toMatchInlineSnapshot(`"C:/path/to/"`)

    expect(regexLogPathInWindows('C:/path/to\\file.txt'))
      .toMatchInlineSnapshot(`"C:/path/to/file.txt"`)

    expect(regexLogPathInWindows('C:\path\\to\\file.txt'))
      .toMatchInlineSnapshot(`undefined`)
  })

  it('regexLogPathInLinOrMac', () => {
    expect(regexLogPathInLinOrMac('/usr/bin'))
      .toMatchInlineSnapshot(`"/usr/bin"`)

    expect(regexLogPathInLinOrMac('usr/bin/'))
      .toMatchInlineSnapshot(`undefined`)

    expect(regexLogPathInLinOrMac('/usr/bin/a.log'))
      .toMatchInlineSnapshot(`"/usr/bin/a.log"`)

    expect(regexLogPathInLinOrMac('/usr/bin/ss.ff.log'))
      .toMatchInlineSnapshot(`"/usr/bin/ss.ff.log"`)

    expect(regexLogPathInLinOrMac('/usr/bin/ccc.abc'))
      .toMatchInlineSnapshot(`"/usr/bin/ccc.abc"`)

    expect(regexLogPathInLinOrMac('/usr\\bin'))
      .toMatchInlineSnapshot(`undefined`)
  })
})
