import { defineNitroConfig } from 'nitropack/config';

export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2025-01-01',
  experimental: {
    openAPI: true,
  },
  routeRules: {
    '/api/**': { cors: true },
  },
});
