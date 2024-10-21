import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
        registerType: 'autoUpdate',
        injectManifest: {
            swSrc: './src/pwa-service-worker.js',
            swDest: './pwa-service-worker.js',
        },
        manifest: {
            name: 'Plant Pals',
            short_name: 'Plant Pals',
            description: 'A plant care app',
            theme_color: '#000000',
            icons: [
                {
                    src: '/public/images/icons/Plant_Pals_192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: '/public/images/icons/Plant_Pals_512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
            ],
        }
        })
]
});