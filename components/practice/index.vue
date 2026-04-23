<script setup lang="ts">
import { defineAsyncComponent, shallowRef, watch } from 'vue'

defineOptions({
  name: 'LazyPractice',
})
const props = defineProps<{ practiceName: string }>()
const selectedComponent = shallowRef()

watch(() => props.practiceName, (newName) => {
  if (newName) {
    // Динамический импорт на основе переменной
    selectedComponent.value = defineAsyncComponent(() =>
      import(`@/components/practice/${newName}/index.vue`),
    )
  }
}, { immediate: true })
</script>

<template>
  <div>
    <!-- Отображаем компонент, если он загружен -->
    <component :is="selectedComponent" v-if="selectedComponent" />
    <div v-else>
      Загрузка практики...
    </div>
  </div>
</template>
