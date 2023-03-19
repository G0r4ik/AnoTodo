import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
// const postcssConfig = require('./postcss.config.js')

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [vue(), visualizer()],
  // css: {
  //   postcss: postcssConfig,
  // },
})
