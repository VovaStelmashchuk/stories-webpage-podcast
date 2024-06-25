// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'nuxt-gtag',
    '@nuxtjs/robots',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    'nuxt-icon',
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  gtag: {
    id: 'G-31X20G71GJ',
  },
  site: {
    url: 'https://androidstory.dev',
  },
  sitemap: {
    xsl: false
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
  }
})