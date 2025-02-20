import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 8025,  
        host: '0.0.0.0',  
        strictPort: true,  

        allowedHosts: ['onboarding.bdudcloud.com'],
      
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
