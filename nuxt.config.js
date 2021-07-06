import dotenv from 'dotenv'
dotenv.config()

const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY
const MICROCMS_API_URL = process.env.MICROCMS_API_URL

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'skbctf',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      {
        hid: 'description',
        name: 'description',
        content: 'Pwn this nirugirish...',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'skbctf',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://skbctf.smallkirby.xyz',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'skbctf: pwn oriented CTF.',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Can you pwn me as nirugiri?',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://skbctf.smallkirby.xyz/img/logo.png',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/firebase.auth.js',
    '~/plugins/challfetch.js',
    { src: '~/store/vuex-persist', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://skbctf.skb.pw'
        : 'http://127.0.0.1:3033',
  },

  serverMiddleware: [
    {
      path: '/hooks',
      handle: '~/serverMiddleware/hooks/github.ts',
    },
  ],

  server: {
    port: 3033,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'postcss-for': {},
      },
    },
  },

  publicRuntimeConfig: {
    microCmsApiUrl: MICROCMS_API_URL,
    microCmsApiKey: MICROCMS_API_KEY, // ok to be leaked
  },
}
