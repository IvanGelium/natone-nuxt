<script setup lang="ts">
defineOptions({
  name: 'CreatePractice',
})

const emit = defineEmits<{
  (e: 'closeDialog',): void
}>()

const practiceData = ref({
  title: '',
})

const createPractice = useCreatePractice()

async function handleSubmit() {
  const { success } = await createPractice({
    title: practiceData.value.title,
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
        <p>Название этапа *</p>
        <ElInput v-model="practiceData.title" placeholder="Введите название этапа" />
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
