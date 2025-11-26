import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@App': path.resolve(__dirname, 'src/App'),
      '@apps': path.resolve(__dirname, 'src/components/apps'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@os': path.resolve(__dirname, 'src/os'),
      '@portfolio': path.resolve(__dirname, 'src/components/Portfolio'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@window': path.resolve(__dirname, 'src/components/Window'),
      '@windowUtils': path.resolve(__dirname, 'src/components/Window/utils'),
      '@filesUtils': path.resolve(
        __dirname,
        'src/components/FilesExplorer/utils'
      ),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@store': path.resolve(__dirname, 'src/store'),
    },
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, '.')],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
