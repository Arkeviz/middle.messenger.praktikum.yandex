import { defineConfig } from 'vite'

export default defineConfig({
  root: '',
  build: {
    outDir: 'dist',
  },
  preview: {
    port: 3000,
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '/src/assets/scss/variables' as *;
        `,
      },
    },
  },
})
