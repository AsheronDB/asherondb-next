// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/ui"],
  css: ["~/assets/css/main.css"],
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
