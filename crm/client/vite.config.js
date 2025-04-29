import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // This is important for SPA routing
    historyApiFallback: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
