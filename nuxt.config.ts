// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },

  modules: ["@pinia/nuxt", "@nuxt/ui", "@nuxtjs/tailwindcss", "@nuxtjs/seo"],
  css: ["~/assets/css/main.css"],
  colorMode: {
    preference: "light",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          defaults: true,
          drop_console: true,
        },
        mangle: {
          eval: true,
          module: true,
          toplevel: true,
          safari10: true,
          properties: false,
        },
        output: {
          comments: false,
        },
      },
    },
  },
});
