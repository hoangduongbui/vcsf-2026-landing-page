import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base: the same build runs at the domain root and in a sub-folder
  // (e.g. /2026/vcsf/). Public files must go through asset() in src/config.ts.
  base: './',
  plugins: [react()],
})
