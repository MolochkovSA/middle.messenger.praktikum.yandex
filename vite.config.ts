import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

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

  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        useFlatConfig: true,
      },
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.{scss,css}',
      },
    }),
  ],
})
