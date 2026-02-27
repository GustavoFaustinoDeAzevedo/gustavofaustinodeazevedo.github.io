import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@App': path.resolve(__dirname, 'src/App'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@os': path.resolve(__dirname, 'src/os'),
      '@portfolio': path.resolve(__dirname, 'src/components/Portfolio'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@windowUtils': path.resolve(
        __dirname,
        'src/components/DesktopEnvironment/WindowFamilies/Window/utils',
      ),
      '@desktopEnv': path.resolve(
        __dirname,
        'src/components/DesktopEnvironment',
      ),
      '@shell': path.resolve(__dirname, 'src/components/DesktopEnvironment'),
      '@systemShell': path.resolve(
        __dirname,
        'src/components/DesktopEnvironment',
      ),
      '@filesUtils': path.resolve(
        __dirname,
        'src/components/DesktopEnvironment/NativeApplications/FilesExplorer/utils',
      ),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@nativeApps': path.resolve(
        __dirname,
        'src/components/DesktopEnvironment/NativeApplications',
      ),
      '@windowFamilies': path.resolve(
        __dirname,
        'src/components/DesktopEnvironment/WindowFamilies',
      ),
      '@window': path.resolve(
        __dirname,
        'src/components/DesktopEnvironment/Window',
      ),
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
