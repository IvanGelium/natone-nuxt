<script setup lang="ts">
import { Crepe } from '@milkdown/crepe'
import { insert } from '@milkdown/utils'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css'

const props = defineProps<{
  content?: string
}>()
const editorRef = ref<HTMLDivElement | null>(null)
let crepe: Crepe | null = null
let editableElement: HTMLElement | null = null

function decodeHtmlEntities(value: string) {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = value
  return textarea.value
}

function normalizePastedMarkdown(value: string) {
  return decodeHtmlEntities(value)
    .replace(/\\([\\`*_{}[\]()#+\-.!])/g, '$1')
}

function handlePaste(event: ClipboardEvent) {
  if (!crepe)
    return

  const text = event.clipboardData?.getData('text/plain')
  if (!text)
    return
  event.preventDefault()
  const insertedText = insert(normalizePastedMarkdown(text))
  crepe.editor.action(insertedText)
}

onMounted(async () => {
  if (editorRef.value) {
    crepe = new Crepe({
      root: editorRef.value,
      defaultValue: props.content || '',
    })

    await crepe.create()
    editableElement = editorRef.value.querySelector('[contenteditable="true"]')
    // editableElement?.addEventListener('paste', handlePaste)
  }
})

defineExpose({
  getContent: () => crepe?.getMarkdown(),
})

onBeforeUnmount(() => {
  editableElement?.removeEventListener('paste', handlePaste)
  editableElement = null
  crepe?.destroy()
})
</script>

<template>
  <div>
    <div ref="editorRef" class="milkdown-container border rounded-2xl p-2 border-primary-500" />
  </div>
</template>
