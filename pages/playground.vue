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

const diagram = `
graph TD
  Start([Начало задачи]) --> Pull[git pull origin main]
  Pull --> Branch[git checkout -b task/name]
  Branch --> Code[Написание кода]
  Code --> Commit[git commit -m '...']
  Commit --> Conflicts{Есть конфликты?}
  
  Conflicts -- Да --> Rebase[git rebase main]
  Rebase --> Resolve[Разрешение конфликтов]
  Resolve --> Push
  
  Conflicts -- Нет --> Push[git push origin branch]
  Push --> MR[Создание Merge Request]
  MR --> End([Готово к ревью])

  style Start fill:#f9f,stroke:#333,stroke-width:2px
  style End fill:#bbf,stroke:#333,stroke-width:2px
`
</script>

<template>
  <div class="rounded-2xl border border-primary-200 bg-secondary p-6 shadow-sm">
    <div class="mt-2 text-2xl font-semibold mb-4">
      Песочница для тестов
    </div>

    <!-- Важно: создаем контейнер для редактора и передаем его через ref -->
    <div ref="editorRef" class="milkdown-container" />
  </div>

  <div>
    <ClientOnly>
      <h1>Git-flow</h1>
      <VueMermaidString :value="diagram" />
    </ClientOnly>
  </div>
</template>

<style scoped>
/* Добавьте немного стилей, чтобы редактор был виден */
.milkdown-container {
  min-height: 200px;
}
</style>
