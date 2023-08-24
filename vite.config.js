import { defineConfig } from 'vite'
    
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "app/public/styles/shared/_responsive.scss";
          @import "app/public/styles/shared/_shared.scss";
        `
      }
    }
  },
  build: {
    outDir: "./dist",
    minify: true,
    sourcemap: true,
    rollupOptions: {
      input: ['./app/game.html', './app/index.html']
    }
  },
  publicDir: './app/public',
  root: 'app',
  assetsInclude: ['**/*.mp3', '**/*.png', '**/*.ico']
})