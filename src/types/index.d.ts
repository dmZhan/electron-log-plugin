export {}

declare global {
  namespace NodeJS {
    interface Process {
      type: 'browser' | 'renderer' | 'worker' | 'utility' | undefined
    }
  }
}
