import { defineConfig } from 'vite'

export default defineConfig({
  root: '',
  build: {
    outDir: 'dist',
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '/src/assets/scss/variables';
        `,
      },
    },
  },
})
