import { rmSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Licensed fonts in public/fonts/ are for local development only.
// Remove them from the production build so they are never deployed;
// the site falls back to Satoshi online.
const stripLicensedFonts = {
  name: 'strip-licensed-fonts',
  apply: 'build',
  closeBundle() {
    rmSync(resolve(import.meta.dirname, 'dist/fonts'), { recursive: true, force: true })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), stripLicensedFonts],
})
