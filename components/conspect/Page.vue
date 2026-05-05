<script setup lang="ts">
import type { ShortPractice } from '~/types'
import Practice from '~/components/conspect/create/Practice.vue'
import Mdblock from '../Mdblock.vue'

const props = defineProps<{
  content: string | undefined
  practice: ShortPractice | undefined
}>()

const config = useRuntimeConfig()

const { content } = toRefs(props)
const link = computed(() => `${config.public.githubRepoUrl}/blob/main/components/practice/${props.practice?.title}.vue`)

const practiceComponent = computed(() => {
  if (!props.practice)
    return null
  return defineAsyncComponent(() =>
    import(`@/components/practice/${props.practice?.title}.vue`),
  )
})
</script>

<template>
  <div class="h-full flex flex-col gap-20">
    <div v-if="props.practice" class="flex flex-col gap-4">
      <Mdblock content="### Практика" />
      <!-- <div>
        <slot name="practice" />

      </div> -->
      <component :is="practiceComponent" />
      <div class="mt-2">
        <a :href="link">Ссылка на GitHub</a>
      </div>
    </div>

    <div class="h-full flex flex-col gap-4">
      <Mdblock content="### Конспект" />
      <Mdblock :content="content" />
    </div>
    <div class="min-h-50" />
  </div>
</template>
