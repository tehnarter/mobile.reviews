<template>
  <div
    v-if="translatedPhone"
    class="px-4 sm:px-6 md:px-12 max-w-screen-lg mx-auto"
  >
    <!-- SEO-заголовок -->
    <h1
      class="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-10 leading-tight"
    >
      {{ translatedPhone.name }}
    </h1>

    <!-- Блоки огляду -->
    <div
      v-for="(block, index) in translatedPhone.review"
      :key="index"
      class="mb-10"
    >
      <!-- Зображення -->
      <picture v-if="block.type === 'image'">
        <source
          :srcset="`
           ${block.src}@1x.webp 1x,
           ${block.src}@2x.webp 2x,
           ${block.src}@3x.webp 3x
          `"
          type="image/webp"
        />
        <source
          :srcset="`
            ${block.src}@1x.jpg 1x,
           ${block.src}@2x.jpg 2x,
            ${block.src}@3x.jpg 3x
          `"
          type="image/jpeg"
        />
        <img
          :src="`${block.src}@2x.jpg`"
          :alt="block.alt || translatedPhone.name"
          class="w-full max-h-[500px] object-cover rounded-2xl shadow-md"
          loading="lazy"
        />
      </picture>

      <!-- Заголовок підрозділу -->
      <h2
        v-else-if="block.type === 'text-title'"
        class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4"
      >
        {{ block.title }}
      </h2>

      <!-- Абзац тексту -->
      <p
        v-else-if="block.type === 'text'"
        class="text-base sm:text-lg leading-relaxed text-gray-800 dark:text-gray-100"
      >
        {{ block.content }}
      </p>

      <!-- Заголовок списку -->
      <h3
        v-else-if="block.type === 'list-title'"
        class="text-xl sm:text-2xl font-semibold text-700 dark:text-400 mt-6 mb-2"
      >
        {{ block.title }}
      </h3>

      <!-- Список -->
      <ul
        v-else-if="block.type === 'list'"
        class="pl-5 list-disc space-y-2 text-base sm:text-lg text-gray-800 dark:text-gray-100"
      >
        <li v-for="(item, i) in block.items" :key="i" class="relative">
          <span class="absolute -left-5 text-green-600 dark:text-green-400"
            >✓</span
          >
          <span class="pl-2">{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- fallback якщо телефон не знайдено -->
  <p
    v-else-if="isPhonePage && !translatedPhone"
    class="text-center text-gray-500"
  >
    {{ $t("not_found") }}
  </p>
</template>

<script setup>
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import { computed, watchEffect } from "vue"
import { useHead, useRuntimeConfig } from "#imports"

const route = useRoute()
const { locale } = useI18n()

// Перевірка чи ми на сторінці телефону
const isPhonePage = computed(() =>
  route.name?.toString().includes("phones-slug")
)

const { data: phoneData } = await useFetch(
  () => `/api/phones/${route.params.slug}`
)

const translatedPhone = computed(() => {
  if (!phoneData.value) return null
  const translations = phoneData.value.translations?.[locale.value]
  return {
    ...translations,
    ...phoneData.value,
  }
})

const lang = locale.value
const config = useRuntimeConfig()
const baseUrl =
  config.public.siteUrl?.replace(/\/$/, "") || "https://example.com"
const urlPrefix = lang !== "ua" ? `/${lang}` : ""

watchEffect(() => {
  if (!translatedPhone.value) return

  const title = translatedPhone.value.title || translatedPhone.value.name
  const description = translatedPhone.value.description || ""
  const ogUrl = `${baseUrl}${urlPrefix}` ///phones/${translatedPhone.value.id}
  const ogImage = `${baseUrl}/images/cover.jpg` // або translatedPhone.value.metaImage якщо є

  useHead({
    title,
    meta: [
      { name: "description", content: description },

      // Open Graph
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:url", content: ogUrl },
      { property: "og:type", content: "article" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    htmlAttrs: {
      lang,
    },
  })
})
</script>
