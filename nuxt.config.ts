// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ],
    },
  },

  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
    "@nuxtjs/seo",
    "@nuxtjs/device",
    "@nuxt/content",
    "@nuxt/eslint",
  ],
  colorMode: {
    preference: "light",
  },
  runtimeConfig: {
    // expects there to be subfolders of different dat sets, so a structure might look like:
    // datDirectory/eor/client_portal.dat
    // datDirectory/megadat/client_portal.dat
    // override with NUXT_DAT_DIRECTORY env variable
    datDirectory: "./../dats/",
    public: {},
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
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: "double",
      },
    },
  },
})
