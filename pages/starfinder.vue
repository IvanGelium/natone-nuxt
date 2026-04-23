<script setup lang="ts">
import { Crepe } from '@milkdown/crepe'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css'

const editorRef = ref<HTMLDivElement | null>(null)
let crepe: Crepe | null = null

onMounted(async () => {
  if (editorRef.value) {
    crepe = new Crepe({
      root: editorRef.value,
      defaultValue: '# Hello, Milkdown!',
    })

    await crepe.create()
  }
})

onBeforeUnmount(() => {
  crepe?.destroy()
})
</script>

<template>
  <div class="rounded-2xl border border-primary-200 bg-secondary p-6 shadow-sm">
    <div class="mt-2 text-2xl font-semibold mb-4">
      Песочница для тестов
    </div>
    
    <!-- Важно: создаем контейнер для редактора и передаем его через ref -->
    <div ref="editorRef" class="milkdown-container"></div>
  </div>
</template>

<style scoped>
/* Добавьте немного стилей, чтобы редактор был виден */
.milkdown-container {
  min-height: 200px;
}
</style>
