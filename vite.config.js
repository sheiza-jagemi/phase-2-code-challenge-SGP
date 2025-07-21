import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes `/api` when forwarding
      },
    },
    port: 3000, // Frontend port
    open: true, // Automatically open browser on `npm run dev`
  },
  build: {
    outDir: 'dist', // GitHub Pages expects `dist` by default (change if needed)
    minify: 'terser', // Minify with Terser
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true, // Remove debugger statements
      },
      format: {
        comments: false, // Remove comments
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'], // Split React into a separate chunk
          router: ['react-router-dom'], // Split React Router into a separate chunk
          vendor: ['lodash', 'axios'], // Add other large dependencies here
        },
        chunkFileNames: 'assets/[name]-[hash].js', // Better chunk naming
        assetFileNames: 'assets/[name]-[hash][extname]', // Better asset naming
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit (in kB)
  },
  base: '/', // Ensure this is '/' for GitHub Pages (or your repo name if in subdir)
});