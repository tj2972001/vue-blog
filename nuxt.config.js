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
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    script: [
      {
        id: "dsq-count-scr",
        src: "//https-tejasjadhav2907-xyz.disqus.com/count.js",
        async: true,
      },
    ],
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
      {
        "http-equiv": "Content-Security-Policy",
        content: "upgrade-insecure-requests",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
      },
      {
        href:
          "https://fonts.googleapis.com/css2?family=Cormorant:wght@500&display=swap",
        rel: "stylesheet",
      },
      {
        href:
          "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap",
        rel: "stylesheet",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;700&family=Roboto:ital,wght@0,100;0,400;0,500;0,700;1,100;1,400;1,500;1,700&family=Train+One&display=swap",
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ["@/assets/css/style.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "~/plugins/vue2-editor", ssr: false },
    { src: "~/plugins/vue-tags-input", ssr: false },
    { src: "~plugins/vue-awesome.js", ssr: false },
    { src: "~plugins/pdf.js", ssr: false },
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
    "@nuxtjs/vuetify",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/toast",
    "vue-social-sharing/nuxt",
    "@nuxtjs/auth",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL,
    mainURL: process.env.MAIN_URL
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    vendor: ["@johmun/vue-tags-input"],
    extend(config, ctx) {
      config.output.globalObject = "this";
      config.module.rules.push({
        test: /\.pdf$/,
        loader: "url-loader",
      });
    },
    babel:{
      plugins: [
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    }
  },
  toast: {
    position: "bottom-right",
    theme: "bubble",
    duration: 3000,
    register: [
      // Register custom toasts
    ],
  },

  env: {
    baseUrl: process.env.BASE_URL,
    mainUrl: process.env.MAIN_URL,
  },
  loading: {
    color: "#184d52",
  },
  server: {
    port: 8000, // default: 3000
    timing: false,
  },
};
