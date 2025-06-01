<template>
  <div
    class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
  >
    <Header />

    <main class="flex-1">
      <!-- <Transition name="anime" mode="out-in"> -->
      <NuxtPage />
      <!-- </Transition> -->
    </main>

    <Footer />
  </div>
</template>
<style scoped="scss">
/* .anime-enter-active,
.anime-leave-active {
  transition: opacity 0.5s ease;
}

.anime-enter-from,
.anime-leave-to {
  opacity: 0;
} */
</style>
