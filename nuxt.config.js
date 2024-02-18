// https://nuxt.com/docs/api/configuration/nuxt-config
/* global defineNuxtConfig */
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://techport.nasa.gov/api/'
    },
  },
  modules: [
    '@nuxt/test-utils/module',
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
  ],
  eslint: {
    extensions: ['js', 'vue'],
    formatter: 'prettier',
  }
})
