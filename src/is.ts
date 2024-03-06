import process from 'node:process'

export const isRenderer = typeof process === 'undefined'
  || (process.type === 'renderer' || process.type === 'worker')

export const isMain = typeof process === 'object' && process.type === 'browser'
