// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxt/ui',
    'nuxt-gtag',
    '@nuxtjs/robots',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    'nuxt-icon',
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
    host: '',
    adminToken: '',
  },
})
