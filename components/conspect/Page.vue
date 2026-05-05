<script setup lang="ts">
import Mdblock from '../Mdblock.vue'

const props = defineProps<{
  content: string | undefined
  practice: string | null
}>()
const { content } = toRefs(props)

const practiceComponent = computed(() => {
  if (!props.practice)
    return null
  return defineAsyncComponent(() =>
    import(`@/components/practice/${props.practice.title}.vue`),
  )
})
</script>

<template>
  <div class="h-full flex flex-col gap-20">
    <div v-if="props.practice" class="flex flex-col gap-4">
      <Mdblock content="### Практика" />
      <!-- <div>
        <slot name="practice" />
        <div class="mt-2">
          <a :href="link">Ссылка на GitHub</a>
        </div>
      </div> -->
      <component :is="practiceComponent" />
    </div>

    <div class="h-full flex flex-col gap-4">
      <Mdblock content="### Конспект" />
      <Mdblock :content="content" />
    </div>
    <div class="min-h-50" />
  </div>
</template>
