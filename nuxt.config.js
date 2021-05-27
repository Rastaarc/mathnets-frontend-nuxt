export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - MathsNet',
    title: 'MathsNet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Mathsnet platform is a platform that teaches all the curriculum\n' +
          'Mathematics at primary level, Secondary level and A level Mathematics. Learn Maths swiftly with best techniques',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  publicRuntimeConfig: {
    PAYSTACK_PUBLIC_KEY:
      process.env.PAYSTACK_PUBLIC_KEY ||
      'pk_test_23abd387bc64b31b9655e1003d5e3abc9cb4f24c',
  },
  privateRuntimeConfig: {
    PAYSTACK_PRIVATE_KEY:
      process.env.PAYSTACK_PRIVATE_KEY ||
      'sk_test_f83558740705a906961bb24e9c2c156ee7a8afda',
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/nuxt-video-player-client.js', mode: 'client' },
    { src: '~/plugins/core-video-player.js', mode: 'client' },
    { src: '~/plugins/video-embed-player.js', mode: 'client' },
    { src: '~/plugins/vue-text-truncate.js', mode: 'client' },
    { src: '~/plugins/vue-paystack-plugin.js', mode: 'client' },
    { src: '~/plugins/vue-youtube-embed.js' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/cloudinary',
  ],
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'rastaarc',
    useComponent: true,
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: 'auth/login', method: 'post' },
          logout: { url: 'auth/logout', method: 'post' },
          user: { url: 'auth/get-user', method: 'get' },
        },
      },
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: { baseURL: process.env.BASE_URL || 'http://localhost:5000/api/v1/' }, // backend default/base url

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#234f8c',
          accent: '#543568',
          secondary: '#f5f7fa',
          info: '4abdbc',
          warning: 'dca450',
          error: '#ff7159',
          success: '#2ad69b',
          background: '#f8f8f8',
        },
      },
    },
  },
  loading: {
    color: '#5070c8',
    height: '4px',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vue-youtube-embed'],
  },
}
