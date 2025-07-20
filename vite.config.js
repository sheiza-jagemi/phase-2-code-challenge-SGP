import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    port: 3000
  },
  build: {
    outDir: 'dist',
    minify: 'terser', // Explicitly use terser
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true // Remove debugger statements
      },
      format: {
        comments: false // Remove comments
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  }
});