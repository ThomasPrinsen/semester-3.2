import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: 'CryptoAPI',
        name: 'Crypto API Application',
        icons: [
          {
            src: 'CryptoCheckerIcon192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: 'CryptoCheckerIcon512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
      },
    }),
  ],
});