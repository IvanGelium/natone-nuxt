// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: '.',
  buildDir: '.nuxt',
  css: ['element-plus/dist/index.css', '@/assets/css/main.css'],
  modules: ['@element-plus/nuxt'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  runtimeConfig: {
    public: {
      githubRepoUrl: process.env.NUXT_PUBLIC_GITHUB_REPO_URL || '',
      baseApiUrl: process.env.BASE_API_URL || '',
    },
  },
  routeRules: {
    // Все запросы на /api/** уйдут на бэкенд
    '/api/**': {
      proxy: `${process.env.API_BASE_URL || 'http://localhost:5001'}/**`
    },
  }
})
