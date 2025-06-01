<script setup>
const { locale, setLocale } = useI18n()

const locales = [
  { code: "ua", label: "🇺🇦 UA" },
  { code: "en", label: "🇬🇧 EN" },
  { code: "pl", label: "🇵🇱 PL" },
  { code: "ru", label: "🇷🇺 RU" },
]

const currentLocale = computed({
  get: () => locale.value,
  set: (val) => setLocale(val),
})
</script>

<template>
  <select
    v-model="currentLocale"
    class="p-2 border rounded bg-white dark:bg-gray-700"
  >
    <option v-for="l in locales" :key="l.code" :value="l.code">
      {{ l.label }}
    </option>
  </select>
</template>
