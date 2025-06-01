<template>
  <main
    class="min-h-screen px-4 py-10 bg-gradient-to-br from-[#f0f4ff] via-[#e9efff] to-[#d9e4ff] dark:from-[#1a1a2e] dark:via-[#16213e] dark:to-[#0f3460] transition-colors duration-500"
  >
    <div class="max-w-6xl mx-auto">
      <h1
        class="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white drop-shadow"
      >
        {{ $t("page.title") }}
      </h1>

      <PhoneCard />
    </div>
  </main>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import { useHead, useRuntimeConfig } from "#imports"

const { t, locale } = useI18n()
const lang = locale.value

const config = useRuntimeConfig()
const baseUrl =
  config.public.siteUrl?.replace(/\/$/, "") || "https://example.com"

// Додаємо префікс до URL лише якщо мова НЕ українська
const urlPrefix = lang !== "ua" ? `/${lang}` : ""
const ogUrl = `${baseUrl}${urlPrefix}/`
const Image = `${baseUrl}/images/cover.jpg`

useHead({
  title: t("seo.title"),
  meta: [
    { name: "description", content: t("seo.description") },
    { name: "keywords", content: t("seo.keywords") },

    // Open Graph
    { property: "og:title", content: t("og.title") },
    { property: "og:description", content: t("og.description") },
    { property: "og:image", content: Image },
    { property: "og:url", content: ogUrl },
    { property: "og:type", content: "website" },

    // Twitter
    { name: "twitter:card", content: t("twitter.card") },
    { name: "twitter:title", content: t("twitter.title") },
    { name: "twitter:description", content: t("twitter.description") },
    { name: "twitter:image", content: Image },
  ],
  htmlAttrs: {
    lang,
  },
})
</script>
