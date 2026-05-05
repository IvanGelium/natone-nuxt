<script setup lang="ts">
defineOptions({
  name: 'CreateConspect',
})

const emit = defineEmits<{
  (e: 'closeDialog',): void
}>()

interface GenericShort {
  id: number
  title: string
}

const conspectData = ref<{
  title: string
  chapterId: number | null
  practiceId: number | null
  selectChapters: GenericShort[]
  selectPracticies: GenericShort[]
}>({
  title: '',
  chapterId: null,
  practiceId: null,
  selectChapters: [],
  selectPracticies: [],
})

const getChaptersIds = useGetChaptersIds()
const getPracticiesIds = useGetPracticiesIds()

const { data: chaptersData } = await getChaptersIds()
const { data: practiciesData } = await getPracticiesIds()
if (chaptersData?.value && practiciesData?.value) {
  conspectData.value.selectChapters = chaptersData.value
  conspectData.value.selectPracticies = practiciesData.value
}

const createConspect = useCreateConspect()
async function handleSubmit() {
  const { success } = await createConspect({
    title: conspectData.value.title,
    chapterId: conspectData.value.chapterId || 1, // Дефолотный этап
    practiceId: conspectData.value.practiceId,
  })
  if (success) {
    ElMessage({ message: 'Успех', type: 'success' })
    emit('closeDialog')
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <p>Название конспекта *</p>
        <ElInput v-model="conspectData.title" placeholder="Введите название этапа" />
      </div>
      <div class="flex flex-col gap-2">
        <p>Родительская глава</p>
        <el-select v-model="conspectData.chapterId" filterable se placeholder="Выберите главу" style="width: 240px">
          <el-option
            v-for="chapter in conspectData.selectChapters"
            :key="chapter.id"
            :label="chapter.title"
            :value="chapter.id"
          />
        </el-select>
      </div>
      <div class="flex flex-col gap-2">
        <p>Практикв</p>
        <el-select v-model="conspectData.practiceId" filterable placeholder="Выберите практику" style="width: 240px">
          <el-option
            v-for="practice in conspectData.selectPracticies"
            :key="practice.id"
            :label="practice.title"
            :value="practice.id"
          />
        </el-select>
      </div>
    </div>
    <div class="w-full flex justify-end">
      <ElButton
        type="primary" @click="handleSubmit"
      >
        Сохранить
      </ElButton>
    </div>
  </div>
</template>
