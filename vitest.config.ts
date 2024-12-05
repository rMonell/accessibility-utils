import { defineConfig } from 'vitest/config'
import { URL, fileURLToPath } from 'node:url'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['src/tests/setup.ts']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    }
  }
})
