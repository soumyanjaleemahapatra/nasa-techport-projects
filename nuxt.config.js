// https://nuxt.com/docs/api/configuration/nuxt-config
/* global defineNuxtConfig */
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'NASA TechPort Projects',
      meta: [
       {
        name: 'description',
        content: 'search and explore NASA\'s TechPort Projects based on their update dates.'
       },
       {
        name: 'logo',
        content: 'https://techport.nasa.gov/images/NASA-Logo.png'
       }
      ]
    }
  },
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
