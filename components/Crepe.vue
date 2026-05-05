<script setup lang="ts">
import { Crepe } from '@milkdown/crepe'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css'

const props = defineProps<{
  content?: string
}>()
const editorRef = ref<HTMLDivElement | null>(null)
let crepe: Crepe | null = null

onMounted(async () => {
  if (editorRef.value) {
    crepe = new Crepe({
      root: editorRef.value,
      defaultValue: props.content || '',
    })

    await crepe.create()
  }
})

defineExpose({
  getContent: () => crepe?.getMarkdown(),
})

onBeforeUnmount(() => {
  crepe?.destroy()
})
</script>

<template>
  <div>
    <div ref="editorRef" class="milkdown-container border rounded-2xl p-2 border-primary-500" />
  </div>
</template>
