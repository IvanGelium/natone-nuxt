<script setup lang="ts">
defineOptions({
  name: 'CreateChapter',
})
const props = defineProps<{
  updateId: number | null
}>()

const emit = defineEmits<{
  (e: 'closeDialog',): void
}>()

interface GenericShort {
  id: number
  title: string
}

const chapterData = ref<{ title: string, stageId: number | null, select: GenericShort[] } >({
  title: '',
  stageId: null,
  select: [],
})

const getChapter = useGetChapter()
async function fillForm(id: number) {
  const { data } = await getChapter(id)
  if (data?.value) {
    chapterData.value.title = data?.value.title || ''
    chapterData.value.stageId = data?.value.stageId || null
  }
}

onMounted(() => {
  if (props.updateId)
    fillForm(props.updateId)
})

const getStagesIds = useGetStagesIds()

const { data } = await getStagesIds()
if (data?.value) {
  chapterData.value.select = data?.value
}
const updateChapter = useUpdateChapter()
const createChapter = useCreateChapter()
async function handleSubmit() {
  if (props.updateId) {
    const { success } = await updateChapter(props.updateId, {
      title: chapterData.value.title,
      stageId: chapterData.value.stageId || 1, // Дефолотный этап
    })
    if (success) {
      ElMessage({ message: 'Успех', type: 'success' })
      emit('closeDialog')
    }
  }
  else {
    const { success } = await createChapter({
      title: chapterData.value.title,
      stageId: chapterData.value.stageId || 1, // Дефолотный этап
    })
    if (success) {
      ElMessage({ message: 'Успех', type: 'success' })
      emit('closeDialog')
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <p>Название главы *</p>
        <ElInput v-model="chapterData.title" placeholder="Введите название главы" />
      </div>
      <div class="flex flex-col gap-2">
        <p>Родительский этап</p>
        <el-select v-model="chapterData.stageId" filterable placeholder="Выберите этап">
          <el-option
            v-for="parrent in chapterData.select"
            :key="parrent.id"
            :label="parrent.title"
            :value="parrent.id"
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
