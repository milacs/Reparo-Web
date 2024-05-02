import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import postcss from 'postcss';

const SERVER_URL = 'http://localhost:3000';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), postcss()],
  server: {
    proxy: {
      '/images': SERVER_URL,
      '/thumbnail': SERVER_URL,
      '/image': SERVER_URL,
      '/upload': SERVER_URL,
    },
  },
});
