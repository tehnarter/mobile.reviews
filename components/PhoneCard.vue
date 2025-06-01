<template>
  <div>
    <ul class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="phone in translatedPhones"
        :key="phone.slug"
        class="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer"
      >
        <NuxtLink :to="localePath(`/phones/${phone.slug}`)">
          <img
            :src="phone.image"
            :alt="phone.name"
            class="w-full h-[350px] object-cover mb-3 rounded-lg"
          />
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ phone.name }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {{ phone.description }}
          </p>

          <ul class="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li v-for="(value, key) in phone.specs" :key="key">
              <strong>{{ key }}:</strong> {{ value }}
            </li>
          </ul>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue"
import { useI18n } from "vue-i18n"
import { useLocalePath } from "#i18n"

const { locale } = useI18n()
const localePath = useLocalePath()
const { data: rawPhones } = await useFetch("/api/phones")

const translatedPhones = ref([])

watchEffect(() => {
  if (!rawPhones.value) return

  translatedPhones.value = rawPhones.value.map((phone) => {
    const t = phone.translations[locale.value] || phone.translations.en
    return {
      slug: phone.slug,
      image: phone.image,
      name: t.name,
      description: t.description,
      specs: t.specs || {},
    }
  })
})
</script>
