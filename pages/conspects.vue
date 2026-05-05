<script setup lang="ts">
import type { Conspect } from '~/types'
import type { CreateModalType } from '~/types/utils'
import { useGetConspect } from '#imports'
import Create from '~/components/conspect/Create.vue'
import Navigation from '~/components/conspect/Navigation.vue'
import Page from '~/components/conspect/Page.vue'
import Header from '~/components/conspect/PageHeader.vue'

const headerData = {
  header: 'Конспекты и практика',
  description: 'Конспекты и практические задания по базовым технологиям.',
}
const isCreateModalOpen = ref(false)
const isUpdateStageModalOpen = ref(false)
const updateStageId = ref<null | number>(null)
const updateChapterId = ref<null | number>(null)
const isUpdateChapterModalOpen = ref(false)
const currentModalType = ref<CreateModalType>('stage')
const getConspect = useGetConspect()
const currentPageId = ref<number | null>(null)
const pageData = ref<Conspect | null>(null)
watch(currentPageId, async () => {
  if (!currentPageId.value)
    return
  const { data: newData } = await getConspect(currentPageId.value)
  if (newData?.value) {
    pageData.value = newData.value
  }
})
onMounted(() => {
  const storaged = localStorage.getItem('currentPageId')
  if (!storaged) {
    currentPageId.value = 1
  }
  else {
    currentPageId.value = JSON.parse(storaged)
  }
})

const isEdit = ref(false)

async function handleChangePage(conspectId: number) {
  currentPageId.value = conspectId
  isEdit.value = false
  localStorage.setItem('currentPageId', JSON.stringify(currentPageId.value))
}

function openUdateModal(id: number, entity: 'chapter' | 'stage') {
  if (entity === 'chapter') {
    updateChapterId.value = id
    isUpdateChapterModalOpen.value = true
  }
  if (entity === 'stage') {
    updateStageId.value = id
    isUpdateStageModalOpen.value = true
  }
}

const deleteStage = useDeleteStage()
const deleteChapter = useDeleteChapter()
const deleteConspect = useDeleteConspect()

async function handleDelete(entity: 'chapter' | 'stage' | 'conspect', id: number | null) {
  if (!id)
    return
  try {
    await ElMessageBox.confirm('Вы уверены что хотите удалить сущность?', 'Подтверждение', { type: 'warning' })
    if (entity === 'chapter')
      await deleteChapter(id)

    if (entity === 'stage')
      await deleteStage(id)

    if (entity === 'conspect')
      await deleteConspect(id)
    ElMessage.success('Готово')
  }
  catch {
  }
}
</script>

<template>
  <div class="h-full flex flex-col gap-2">
    <Header
      :header="headerData.header"
      :description="headerData.description"
      @is-edit="isEdit = !isEdit"
      @delete="handleDelete('conspect', currentPageId)"
      @hide="isEdit = !isEdit"
    />
    <div class="h-full flex-1 min-h-0 grid gap-2 grid-cols-[280px_1fr]">
      <Navigation
        :current-page-id="currentPageId"
        @change-page="handleChangePage"
        @open-create-modal="(modalType) => {
          isCreateModalOpen = true
          currentModalType = modalType
        }"
        @open-update-modal-chapter="(id) => openUdateModal(id, 'chapter')"
        @open-update-modal-stage="(id) => openUdateModal(id, 'stage')"
        @delete-chapter="(id) => handleDelete('chapter', id)"
        @delete-stage="(id) => handleDelete('stage', id)"
      />

      <main class="h-full flex min-h-0 flex-col overflow-hidden rounded-2xl border border-primary-200 bg-secondary shadow-sm">
        <div class="border-b border-primary-200 bg-primary-50 px-6 py-4">
          <div v-if="pageData" class="h-5 text-xl font-semibold">
            {{ pageData?.title }}
          </div>
        </div>
        <div v-if="pageData" class="h-full overflow-auto px-6 py-6">
          <!-- <Page v-if="!isEdit" :practice="!!currentPage?.practice" :content="currentPage?.content" :link="currentLink">
            <template v-if="currentPage?.practice" #practice>
              <component :is="currentPage.practice" />
            </template>
          </Page> -->
          <Page v-if="!isEdit" :practice="pageData.practice" :content="pageData?.body" />
          <div v-else>
            <ConspectEdit
              :conspect-data="pageData"
              @close-edit="isEdit = !isEdit"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
  <ElDialog
    v-model="isCreateModalOpen"
    title="Создание сущности"
  >
    <Create
      :update-id="null"
      :modal-type="currentModalType"
      @close-dialog="isCreateModalOpen = false"
    />
  </ElDialog>

  <ElDialog
    v-model="isUpdateStageModalOpen"
    title="Создание сущности"
  >
    <Create
      :update-id="updateStageId"
      modal-type="stage"
      @close-dialog="isUpdateStageModalOpen = false"
    />
  </ElDialog>
  <ElDialog
    v-model="isUpdateChapterModalOpen"
    title="Создание сущности"
  >
    <Create
      :update-id="updateChapterId"
      modal-type="chapter"
      @close-dialog="isUpdateChapterModalOpen = false"
    />
  </ElDialog>
</template>
