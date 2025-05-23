import { defineConfig, loadEnv } from 'vite';  // Add loadEnv
import react from '@vitejs/plugin-react';


export default defineConfig(({ mode }) => {  // Use a function to access mode
  const env = loadEnv(mode, process.cwd(), '');  // Load env vars

  return {
    plugins: [react()],
    server: {
      port: 8025,
      host: '0.0.0.0',
      strictPort: true,
      allowedHosts: ['onboarding.bdudcloud.com'],
      proxy: {
    
  '/api': {
    target: "https://onboarding-api.bdudcloud.com",
    changeOrigin: true,
    secure: false,
    rewrite: path => path.replace(/^\/api/, ''),
  },

        '/chatbot': {
          target: env.VITE_BACKEND_URL2,  // Use env.VITE_BACKEND_URL2 instead
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/chatbot/, ''),
        },
      },
    },
    build: {
      outDir: 'dist',
    },
  };
});