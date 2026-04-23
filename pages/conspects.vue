<script setup lang="ts">
import type { Conspect } from '~/types'
import type { CreateModalType } from '~/types/utils'
import { useGetConspect } from '#imports'
import Create from '~/components/conspect/Create.vue'

// import type { Component } from 'vue'
// import { pagesGit } from '~/assets/conspect/one/git'
// import { pagesJs } from '~/assets/conspect/one/js'
// import { pagesTs } from '~/assets/conspect/one/ts'
// import { getDocUrl } from '~/utils'
import Navigation from '~/components/conspect/Navigation.vue'
import Page from '~/components/conspect/Page.vue'
import Header from '~/components/conspect/PageHeader.vue'

const headerData = {
  header: 'Конспекты и практика',
  description: 'Конспекты и практические задания по базовым технологиям.',
}
const isCreateModalOpen = ref(false)
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
  localStorage.setItem('currentPageId', JSON.stringify(currentPageId.value))
}
</script>

<template>
  <div class="h-full flex flex-col gap-2">
    <Header
      :header="headerData.header"
      :description="headerData.description"
      @is-edit="isEdit = !isEdit"
      @delete="isEdit = !isEdit"
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
          <Page v-if="!isEdit" :content="pageData?.body" />
          <div v-else>
            <div class="flex justify-end">
              <ElButton type="primary">
                Сохранить
              </ElButton>
              <ElButton type="primary" @click="isEdit = !isEdit">
                Отменить
              </ElButton>
            </div>
            <div>
              <h2 class="text-xl mb-2">
                Практика
              </h2>
              <el-select
                v-model="selectedValue"
                placeholder="Выберите практику"
                filterable
                clearable
                style="width: 240px"
              >
                <el-option
                  v-for="item in fakepractice"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div>
              <h2 class="text-xl mb-2 mt-10">
                Заголовок*
              </h2>
              <ElInput v-model="pageData.title" placeholder="Укажите заголовок" />
            </div>
            <div class="text-xl mb-2 mt-10">
              <h2>Конспект</h2>
              <Crepe :content="pageData?.body" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <ElDialog
    v-model="isCreateModalOpen"
  >
    <Create :modal-type="currentModalType" />
  </ElDialog>
</template>
