import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 8025,       // Ensure Vite listens on 8025
        allowedHosts: [
            'onboarding.bdudcloud.com',
            'onboarding-api.bdudcloud.com'
      ],
        proxy: {
            '/api': {
                target: 'https://onboarding-api.bdudcloud.com',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        outDir: 'dist',
    }
});
