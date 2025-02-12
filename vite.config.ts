import { defineConfig } from "vite"

export default defineConfig({
  root: '',
  build: {
    outDir: 'dist',
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '/src/assets/scss/normalize';
          @import '/src/assets/fonts/fonts';
          @import '/src/assets/scss/variables';
          @import '/src/assets/scss/main';
        `
      }
    }
  },
})
