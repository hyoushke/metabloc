import EnvironmentPlugin from 'vite-plugin-environment'
import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr'

import manifest from './manifest.json';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true
    }),
    EnvironmentPlugin('all'),
    VitePWA({
      manifest,
      disable: true,
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      devOptions: {
        enabled: false,
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
        cleanupOutdatedCaches: true,
      },

    }),
  ],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './src/shared'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@app': path.resolve(__dirname, './src/app'),
      '@public': path.resolve(__dirname, './public'),
    },
  },
});

