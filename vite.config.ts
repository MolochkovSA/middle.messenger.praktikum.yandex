import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern", "legacy"
        quietDeps: true,
        silenceDeprecations: ['legacy-js-api', 'import'],
      },
    },
  },

  resolve: {
    alias: {
      '@': '/src',
    },
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },
})
