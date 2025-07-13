import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      // Configuración explícita para Rollup
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@heroicons/react']
        }
      }
    }
  }
});