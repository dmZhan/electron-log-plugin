import { describe, expect, it } from 'vitest'
import { resolveConfigSync } from '../src/config'

describe('file', () => {
  it('resolveConfigSync', () => {
    expect(resolveConfigSync()).toMatchInlineSnapshot(`
      {
        "fileExt": [
          "sss",
        ],
        "fileName": "SMSLog-{y}-{m}-{d}",
        "fragment": true,
        "path": "D:\\l\\logs",
        "size": 102400,
      }
    `)
  })
})
