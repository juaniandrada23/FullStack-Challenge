import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@shared/types': path.resolve(__dirname, '../types/shared.types.ts'),
      '/types/shared.types': path.resolve(__dirname, '../types/shared.types.ts'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
      interval: 1000,   
    },
    hmr: {
      host: 'localhost',
    },
  },
})