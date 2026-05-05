<script setup lang="ts">
defineOptions({
  name: 'CreateStage',
})

const props = defineProps<{
  updateId: number | null
}>()

const emit = defineEmits<{
  (e: 'closeDialog',): void
}>()

const stageData = ref({
  title: '',
})

const getStage = useGetStage()
async function fillForm(id: number) {
  const { data } = await getStage(id)
  if (data?.value) {
    stageData.value.title = data?.value.title || ''
  }
}

onMounted(() => {
  if (props.updateId)
    fillForm(props.updateId)
})

const updateStage = useUpdateStage()
const createStage = useCreateStage()
async function handleSubmit() {
  if (props.updateId) {
    const { success } = await updateStage(props.updateId, {
      title: stageData.value.title,
    })
    if (success) {
      ElMessage('Успех')
      emit('closeDialog')
    }
  }
  else {
    const { success } = await createStage({
      title: stageData.value.title,
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
        <p>Название этапа *</p>
        <ElInput v-model="stageData.title" placeholder="Введите название этапа" />
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
