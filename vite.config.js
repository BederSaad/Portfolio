import { defineConfig } from 'vite'

export default defineConfig({
  // Change '/portfolio/' to your actual GitHub repo name when deploying
  // e.g. if your repo is github.com/bedersaad/portfolio → base: '/portfolio/'
  // For a username page (bedersaad.github.io) → base: '/'
  base: '/portfolio/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist'
  }
})
