import { defineConfig } from 'vite'
    
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "public/styles/shared/_responsive.scss";
          @import "public/styles/shared/_shared.scss";
        `
      }
    }
  }
})