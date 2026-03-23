export default defineNuxtConfig({
  compatibilityDate: "2025-05-03",

  typescript: {
    shim: false,
  },

  devtools: { enabled: false },

  css: ["@/assets/styles/main.scss", "swiper/css"],

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "nuxt-gtag",
  ],
  runtimeConfig: {
    public: {
      // автоматично підтягнеться з NUXT_PUBLIC_SITE_URL
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://example.com",
    },
    // підтягнеться з NUXT_SITE_NAME, доступне лише на сервері
    siteName: process.env.NUXT_SITE_NAME || "Default Site Name",
  },
  site: {
    // або вручну звідси підтягни
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://example.com",
    name: process.env.NUXT_SITE_NAME || "Default Site Name",
    trailingSlash: true, // шляхи з / в sitemap
  },

  gtag: {
    id: "G-BMZC0KJY64", // Увімкни, коли отримаєш ID від Google Analytics
  },

  app: {
    head: {
      title: "Огляди смартфонів 2025 – Рейтинг, порівняння, характеристики",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Найактуальніші огляди смартфонів 2025 року: iPhone, Samsung, Xiaomi, OnePlus, Google Pixel та інші. Порівняння характеристик, плюси і мінуси, фото, думки.",
        },
        {
          name: "keywords",
          content:
            "смартфони 2025, огляд, iPhone 16, Samsung S25, Xiaomi 15, характеристики, рейтинг",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  i18n: {
    lazy: true,
    langDir: "locales",
    strategy: "prefix",
    trailingSlash: true, // додає слеш у кінці URL → /ua/ замість /ua
    defaultLocale: "en",
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://example.com",
    locales: [
      {
        code: "ua",
        iso: "uk-UA",
        file: "ua.json",
        language: "uk",
        name: "Українська",
      },
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
        language: "en",
        name: "English",
      },
      {
        code: "pl",
        iso: "pl-PL",
        file: "pl.json",
        language: "pl",
        name: "Polski",
      },
      {
        code: "ru",
        iso: "ru-RU",
        file: "ru.json",
        language: "ru",
        name: "Русский",
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true, // true завжди примусово редіректити на мову браузера
      redirectOn: "root", // тільки редірект з /
      fallbackLocale: "en",
    },
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/utils" as *;',
        },
      },
    },
  },
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: "append", // "append" або "remove" — маршрут без /
      },
    },
  },
  nitro: {
    preset: "static", //"node-server" — серверний режим (SSR) | "static"— повністю статичний сайт (SSG)
    prerender: {
      // Вкажи тут усі маршрути, які потрібно обов’язково зберегти як HTML
      routes: [
        // "/", // index.html
        // "/about", // about/index.html
      ],
    },
    // logLevel: "debug",
    // // Це примусово виведе помилки під час SSR
    // errorHandler: "~/server/error-handler",
  },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
})
