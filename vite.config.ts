import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-app/',
  server: {
    host: true, // Listen on all addresses including 0.0.0.0 for Docker
    port: 5173,
    watch: {
      usePolling: true, // Enable polling for Docker volumes on Windows/Mac
    },
  },
})
