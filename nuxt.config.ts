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
    primary: 'green',
  },
  head: {
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
       {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
        },
    ]
  },
 
  
  compatibilityDate: '2025-03-20',
});