import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,  // Allows external access (needed for Docker)
        port: 8080,  // Set port to 8080
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
