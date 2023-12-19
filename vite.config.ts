import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';

export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [{ find: '@', replacement: '/src' }],
    }),
  ],
});