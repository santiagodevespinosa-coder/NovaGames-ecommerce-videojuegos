import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Cualquier petición que empiece con /api será redirigida a tu backend de C#
      '/api': {
        target: 'https://localhost:7001', // Cambia esto por el puerto real de tu API de C#
        changeOrigin: true,
        secure: false, // Útil si usas certificados https locales autofirmados
      }
    }
  }
})