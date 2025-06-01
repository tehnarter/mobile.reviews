<template>
  <footer
    class="bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-gray-900 dark:to-gray-800 shadow-inner"
  >
    <p
      class="container mx-auto px-4 py-6 text-center text-sm text-white dark:text-gray-300"
    >
      &copy; {{ new Date().getFullYear() }}
      <span class="font-semibold">Mobile Reviews</span>.
      {{ $t("footer.rights") }}
    </p>
  </footer>
</template>
