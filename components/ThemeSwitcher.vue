<template>
  <button
    ref="themeBtn"
    @click="toggleTheme"
    class="text-xl p-2 rounded transition"
    :aria-label="$t('toggleTheme')"
  >
    <span v-if="isDark">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<script setup>
import { ref } from "vue"
import { useColorMode } from "@vueuse/core"
import gsap from "gsap"

const themeBtn = ref(null)
const mode = useColorMode()
const isDark = ref(mode.value === "dark")

// Анімація зміни теми з плавним переходом
function animateThemeChange(toDark) {
  const body = document.body

  // Зміна фону та кольору тексту з плавним переходом
  gsap.to(body, {
    duration: 5, // 5 секунд для переходу
    backgroundColor: toDark ? "#1f2937" : "#ffffff", // Темний / світлий фон
    color: toDark ? "#f3f4f6" : "#1f2937", // Темний / світлий текст
    ease: "power2.inOut", // Плавний перехід
  })

  // Анімація кнопки
  gsap.fromTo(
    themeBtn.value,
    {
      rotation: 0,
      scale: 1,
    },
    {
      rotation: 360,
      scale: 1.3,
      duration: 1.2,
      ease: "elastic.out(1, 0.3)",
    }
  )
}

function toggleTheme() {
  const toDark = mode.value === "light"
  mode.value = toDark ? "dark" : "light"
  isDark.value = toDark
  animateThemeChange(toDark)
}
</script>
