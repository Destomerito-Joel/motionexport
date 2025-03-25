// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@/assets/css/tailwind.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    ssr: {
      noExternal: ['jspdf']
    }
  },
  ui: {
    primary: 'blue',
  },
  head: {
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
    ]
  },
  pwa: {
    manifest: {
      name: 'Motion Express Way',
      short_name: 'MotionExpressWay',
      description: 'Track Your Shipment',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: '/images/logo.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/images/logo.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json}']
    },
    registerType: 'autoUpdate'
  },
  
  compatibilityDate: '2025-03-20',
});