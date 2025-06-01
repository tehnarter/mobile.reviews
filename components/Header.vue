<script setup>
import { useRoute } from "vue-router"
import { useLocalePath } from "#i18n"

const route = useRoute()
const localePath = useLocalePath()
const isPhonePage = computed(() =>
  route.name?.toString().includes("phones-slug")
)
</script>

<template>
  <header
    class="flex items-center justify-between px-6 py-4 border-b shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900"
  >
    <!-- Логотип + кнопка Назад -->
    <div class="flex items-center space-x-4">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
        <span class="text-3xl">📱</span>
        <span
          class="text-xl sm:text-2xl font-extrabold tracking-tight text-white dark:text-white"
        >
          Mobile <span class="text-yellow-300">Reviews</span>
        </span>
      </NuxtLink>

      <NuxtLink
        v-if="isPhonePage"
        :to="localePath('/')"
        class="ml-2 px-3 py-1.5 rounded-md text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-400 transition"
      >
        {{ $t("back") }}
      </NuxtLink>
    </div>

    <!-- Перемикачі -->
    <div class="flex items-center gap-3">
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  </header>
</template>
