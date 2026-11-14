import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Redirige peticiones /api al backend ASP.NET Core (API_videojurgos)
      '/api': {
        target: 'http://localhost:5292',
        changeOrigin: true,
      }
    }
  }
})