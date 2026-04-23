<script setup>
// Nuxt автоматически прокидывает пропс 'error'
defineProps({
  error: Object,
})

// Функция для очистки ошибки и редиректа
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="bg-primary-100 h-screen flex justify-center items-center">
    <div class="flex justify-center items-center flex-col gap-4">
      <h1 class="text-4xl">
        {{ error.statusCode }} — {{ error.message }}
      </h1>
      <button @click="handleError">
        <p class="hover:underline cursor-pointer text-primary-500">
          Вернуться домой
        </p>
      </button>
    </div>
  </div>
</template>
