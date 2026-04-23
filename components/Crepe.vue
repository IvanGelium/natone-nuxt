<script setup lang="ts">
import { Crepe } from '@milkdown/crepe'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css'
import { ElButton } from 'element-plus';

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

onBeforeUnmount(() => {
  crepe?.destroy()
})
</script>

<template>
  <div>
    <div ref="editorRef" class="milkdown-container"/>
  </div>
</template>