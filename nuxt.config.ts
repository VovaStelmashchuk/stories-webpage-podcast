// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        '@nuxt/ui',
        '@nuxtjs/tailwindcss',
        'nuxt-gtag',
    ],
    tailwindcss: {
        exposeConfig: true,
        viewer: true,
    },
    gtag: {
        id: 'G-31X20G71GJ',
    }
})