// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  ssr: true,
  modules: [
    '@nuxt/ui',
    'nuxt-gtag',
    '@nuxtjs/robots',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    'nuxt-icon',
    '@pinia/nuxt',
    "@nuxtjs/tailwindcss"
  ],
  gtag: {
    id: 'G-31X20G71GJ',
  },
  site: {
    url: 'https://androidstory.dev',
  },
  sitemap: {
    xsl: false
  },
  tailwindcss: {
    configPath: 'tailwind.config.js'
  },
  runtimeConfig: {
    dbUrl: '',
    minio: {
      endPoint: '',
      port: '',
      accessKey: '',
      secretKey: '',
    },
    host: 'https://androidstory.dev',
    adminToken: '',
  },
  colorMode: {
    preference: 'light'
  },
})