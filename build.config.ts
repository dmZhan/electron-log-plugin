import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: ['electron-log', 'unconfig', 'electron'],
  rollup: {
    inlineDependencies: true,
    emitCJS: true,
  },
  clean: true,
  declaration: true,
})
