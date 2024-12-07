import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        // Create a single bundle for the widget
        entryFileNames: 'quiz-widget.js',
        chunkFileNames: 'quiz-widget-chunk-[hash].js',
        assetFileNames: 'quiz-widget-assets-[hash][extname]',
      },
    },
    // Generate a single JS file
    cssCodeSplit: false,
  },
});