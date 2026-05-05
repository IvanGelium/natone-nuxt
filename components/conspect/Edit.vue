<script setup lang="ts">
import type { Conspect, ShortChapter, ShortPractice } from '~/types'

defineOptions({
  name: 'ConspectEdit',
})

const props = defineProps<{
  conspectData: Conspect
}>()

const emit = defineEmits<{
  (e: 'closeEdit',): void
}>()

const conspect = ref<Partial<Conspect>>({
  id: props.conspectData.id,
  title: props.conspectData?.title || '',
  body: props.conspectData?.body || '',
  chapterId: props.conspectData?.chapterId,
  practiceId: props.conspectData?.practiceId,
})

const editorComponent = ref<Ref | null>(null)
function getContent() {
  if (!editorComponent?.value)
    return

  return editorComponent.value.getContent()
}

const getPracticiesIds = useGetPracticiesIds()
const getChaptersIds = useGetChaptersIds()
const practiciesIds = ref<ShortPractice[]>([])
const chaptersIds = ref<ShortChapter[]>([])

onMounted(async () => {
  const { data: practiciesData } = await getPracticiesIds()
  if (practiciesData?.value) {
    practiciesIds.value = practiciesData.value
  }

  const { data: ChaptersData } = await getChaptersIds()
  if (ChaptersData?.value)
    chaptersIds.value = ChaptersData.value
})

const updateConspect = useUpdateConspect()

async function handleSubmit() {
  if (conspect.value?.id) {
    const data = {
      title: conspect.value.title,
      body: getContent(),
      chapterId: conspect.value.chapterId,
      practiceId: conspect.value.practiceId,
    }
    const { success } = await updateConspect(conspect.value.id, data)
    if (success) {
      ElMessage({ message: 'Успех', type: 'success' })
      emit('closeEdit')
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-end">
      <ElButton
        type="primary"
        @click="handleSubmit"
      >
        Сохранить
      </ElButton>
      <ElButton type="primary" @click="emit('closeEdit')">
        Отменить
      </ElButton>
    </div>
    <div>
      <h2 class="text-xl mb-2">
        Глава
      </h2>
      <el-select
        v-model="conspect.chapterId"
        placeholder="Выберите главу"
        filterable
        clearable
      >
        <el-option
          v-for="chapter in chaptersIds"
          :key="chapter.id"
          :label="chapter.title"
          :value="chapter.id"
        />
      </el-select>
    </div>
    <div>
      <h2 class="text-xl mb-2">
        Практика
      </h2>
      <el-select
        v-model="conspect.practiceId"
        placeholder="Выберите практику"
        filterable
        clearable
      >
        <el-option
          v-for="practice in practiciesIds"
          :key="practice.id"
          :label="practice.title"
          :value="practice.id"
        />
      </el-select>
    </div>
    <div>
      <h2 class="text-xl mb-2">
        Заголовок*
      </h2>
      <ElInput v-model="conspect.title" placeholder="Укажите заголовок" />
    </div>
    <div class="text-xl mb-2 flex flex-col gap-2">
      <h2>Конспект</h2>
      <div>
        <Crepe ref="editorComponent" :content="conspect.body" />
      </div>
    </div>
  </div>
</template>
