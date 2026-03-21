import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/nvidia': {
        target: 'https://integrate.api.nvidia.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/nvidia/, '')
      },
      '/api/geocode': {
        target: 'https://nominatim.openstreetmap.org',
        changeOrigin: true,
        // Rewrite /api/geocode?lat=X&lon=Y → /reverse?format=json&lat=X&lon=Y
        rewrite: (path) => path.replace(/^\/api\/geocode/, '/reverse') + '&format=json&accept-language=en',
        headers: {
          'User-Agent': 'MindCompass-App/1.0 (mental health screener; contact@mindcompass.app)'
        }
      }
    }
  }
});

