import colors from 'vuetify/es5/util/colors'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  // target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    script: [
      {
        id: 'dsq-count-scr',
        src: 'https-tejasjadhav2907-xyz.disqus.com/count.js',
      },
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        'http-equiv': 'Content-Security-Policy',
        content: 'upgrade-insecure-requests',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        href:
          'https://fonts.googleapis.com/css2?family=Cormorant:wght@500&display=swap',
        rel: 'stylesheet',
      },
      {
        href:
          'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap',
        rel: 'stylesheet',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;700&family=Roboto:ital,wght@0,100;0,400;0,500;0,700;1,100;1,400;1,500;1,700&family=Train+One&display=swap',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/style.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/vue2-editor', ssr: false },
    { src: '~/plugins/vue-tags-input', ssr: false },
    { src: '~plugins/vue-awesome.js', ssr: false },
    { src: '~plugins/pdf.js', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    'vue-social-sharing/nuxt',
    '@nuxtjs/auth',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://143.110.253.186:8000/api/v1',
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
    treeShake: true,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    vendor: ['@johmun/vue-tags-input'],
    extend(config, ctx) {
      config.output.globalObject = 'this'
      config.module.rules.push({
        test: /\.pdf$/,
        loader: 'url-loader',
      })
    },
  },
  serverMiddleware: ['~/api/app.js'],
  toast: {
    position: 'bottom-right',
    theme: 'bubble',
    duration: 3000,
    register: [
      // Register custom toasts
    ],
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/user/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: false,
          user: {
            url: '/user/profile/me',
            method: 'get',
            propertyName: 'data.user',
          },
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      },
    },
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://tejas-blog.herokuapp.com/api/v1',
    mainUrl: process.env.MAIN_URL || 'https://tejas-blog.herokuapp.com/',
  },
  loading: {
    color: '#184d52',
  },
  server: {
    port: 8000, // default: 3000
    host: '143.110.253.186', // default: localhost,
    timing: false,
  },
}
