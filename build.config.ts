import { defineBuildConfig } from 'unbuild'

import { URL, fileURLToPath } from 'node:url'

export default defineBuildConfig({
  entries: ['src/index'],
  outDir: 'dist',
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    esbuild: {
      minify: true
    }
  },
  alias: {
    '@': fileURLToPath(new URL('src', import.meta.url))
  }
})
