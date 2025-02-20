import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',  // Allow external access from Docker
        port: 8025,       // Ensure Vite listens on 8025
        strictPort: true, // Prevent Vite from switching ports
        allowedHosts: [
            "https://onboarding.bdudcloud.com/",
            'https://onboarding-api.bdudcloud.com'
      ],
        proxy: {
            '/api': {
                target: 'https://onboarding-api.bdudcloud.com',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
});
