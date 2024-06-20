// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    ssr: true,
    modules: [
        '@nuxt/ui',
        '@nuxtjs/tailwindcss',
        'nuxt-gtag',
        '@nuxtjs/robots',
        '@nuxtjs/seo',
        '@nuxtjs/sitemap',
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
        }
    }
})