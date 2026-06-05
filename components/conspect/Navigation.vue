<script setup lang="ts">
import type { CreateModalType } from '~/types/utils'
import { Delete, Edit, EditPen, Plus } from '@element-plus/icons-vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import { ElButton } from 'element-plus'

defineProps<{
  currentPageId: number | null
}>()
const emit = defineEmits<{
  (e: 'changePage', pageId: number): void
  (e: 'openCreateModal', modalType: CreateModalType): void
  (e: 'openUpdateModalChapter', updateId: number): void
  (e: 'openUpdateModalStage', updateId: number): void
  (e: 'deleteChapter', deleteId: number): void
  (e: 'deleteStage', deleteId: number): void
}>()
const isAdmin = ref(false)
watch(isAdminStore.isAdmin, (isIt) => {
  isAdmin.value = isIt
})
const getNavigation = useGetNavigation()
const { data } = await getNavigation()
const literals: CreateModalType[] = ['stage', 'chapter', 'conspect', 'practice']
const labels = ['Этап', 'Глава', 'Конспект', 'Практика']
const buttons = literals.map((l, i) => {
  return {
    label: labels[i],
    literals: l,
  }
})

const currentItem = ref('stage')
const currentItemsOrder = ref<{ id: number, orderIndex: number }[]>([])
const currentItemData = ref<any[]>([])
// onMounted(() => {
//   currentItemsOrder.value = data?.stages.map((s) => {
//     return {
//       id: s.id,
//       orderIndex: s.orderIndex,
//     }
//   }) || []
// })

const setNavigationOrder = useSetNavigationOrder()
function handleSubmitNewOrder() {
  const _res = setNavigationOrder(currentItemsOrder.value, currentItem.value)
}

const isSetOrderModalOpen = ref(false)

function setCurrentItemTO(itemType: 'stage' | 'chapter' | 'conspect', idStage?: number, idChapter?: number) {
  switch (itemType) {
    case 'stage':
      currentItem.value = itemType
      currentItemsOrder.value = data?.stages.map((s) => {
        return {
          id: s.id,
          orderIndex: s.orderIndex,
        }
      }) || []
      currentItemData.value = data?.stages || []
      break
    case 'chapter':
      currentItem.value = itemType
      currentItemsOrder.value = data?.stages.find(s => s.id === idStage)?.chapters.map((s) => {
        return {
          id: s.id,
          orderIndex: s.orderIndex,
        }
      }) || []
      currentItemData.value = data?.stages.find(s => s.id === idStage)?.chapters || []
      break

    case 'conspect':
      currentItem.value = itemType
      currentItemsOrder.value = data?.stages.find(s => s.id === idStage)?.chapters.find(c => c.id === idChapter)?.conspects.map((s) => {
        return {
          id: s.id,
          orderIndex: s.orderIndex,
        }
      }) || []
      currentItemData.value = data?.stages.find(s => s.id === idStage)?.chapters.find(c => c.id === idChapter)?.conspects || []
  }
}
</script>

<template>
  <div class="h-full flex flex-col overflow-auto">
    <div class="sticky flex justify-between items-center z-10 p-4 text-sm uppercase rounded-t-2xl bg-primary-50 tracking-wide text-secondary border border-primary-200">
      <p>Разделы</p>
      <ElButton
        v-if="isAdmin"
        :icon="EditPen"
        type="text"
        @click="() => {
          isSetOrderModalOpen = !isSetOrderModalOpen
          setCurrentItemTO('stage')
        }"
      />
    </div>
    <aside class="h-full overflow-scroll min-h-0 rounded-b-2xl border border-primary-200 bg-secondary shadow-sm">
      <div v-if="data" class="flex flex-col">
        <div
          v-for="stage in data.stages"
          :key="`${stage.title}-${stage.id}`"
          class=""
        >
          <div class="border-b border-primary-300 flex flex-col p-4">
            <div class="group/stage flex justify-between items-center">
              <div>
                <span class="text-xl">
                  {{ stage.title }}:
                </span>
                <!-- <span class="text-sm">
                  &nbsp; {{ stage.chapters.length }}
                </span> -->
              </div>
              <div class="invisible items-center gap-2 group-hover/stage:visible flex">
                <div
                  v-if="isAdmin"
                  class="opacity-40 hover:opacity-100 transition-opacity rounded-full"
                  @click="emit('openUpdateModalStage', stage.id)"
                >
                  <Edit width="16" />
                </div>
                <ElButton
                  v-if="isAdmin"
                  :icon="EditPen"
                  type="text"
                  @click="() => {
                    isSetOrderModalOpen = !isSetOrderModalOpen
                    setCurrentItemTO('chapter', stage.id)
                  }"
                />
                <div
                  v-if="isAdmin"
                  class="opacity-40 hover:opacity-100 transition-opacity rounded-full"
                  @click="emit('deleteStage', stage.id)"
                >
                  <Delete width="16" />
                </div>
              </div>
            </div>
            <div
              v-for="(chapter,) in stage.chapters"
              :key="`${chapter.title}-${chapter.id}`"
              class="flex flex-col gap-2 text-lg px-2 py-2"
            >
              <div class="group/chapter flex justify-between items-center">
                <div>
                  <span class="text">
                    {{ chapter.title }}:
                  </span>
                  <!-- <span class="text-sm">
                    &nbsp; {{ chapter.conspects.length }}
                  </span> -->
                </div>
                <div class="invisible items-center gap-2 group-hover/chapter:visible flex">
                  <div
                    v-if="isAdmin"
                    class="opacity-40 hover:opacity-100 rounded-full"
                    @click="emit('openUpdateModalChapter', chapter.id)"
                  >
                    <Edit width="16" />
                  </div>
                  <ElButton
                    v-if="isAdmin"
                    :icon="EditPen"
                    type="text"
                    @click="() => {
                      isSetOrderModalOpen = !isSetOrderModalOpen
                      setCurrentItemTO('conspect', stage.id, chapter.id)
                    }"
                  />
                  <div
                    v-if="isAdmin"
                    class="opacity-40 hover:opacity-100 rounded-full"
                    @click="emit('deleteChapter', chapter.id)"
                  >
                    <Delete width="16" />
                  </div>
                </div>
              </div>
              <div
                v-for="(conspect, conspectIndex) in chapter.conspects"
                :key="`${conspect.title}-${conspect.id}`"
              >
                <div
                  class="cursor-pointer w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-primary-100"
                  :class="currentPageId === conspect.id ? 'bg-primary-400 text-white hover:bg-primary-500' : 'text-secondary'"
                  @click="emit('changePage', conspect.id)"
                >
                  <span class="flex items-center w-full">
                    <span class="text-sm">{{ conspectIndex + 1 }}. &nbsp; </span><p>{{ conspect.title }}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="!data" class="bg-primary-100 rounded-xl flex max-h-8 items-center gap-2 py-2 px-4">
        <ElIconInfoFilled width="24" class="opacity-40" /><span>Нет данных</span>
      </div>
      <div v-if="isAdmin" class="mt-4 w-full flex flex-col gap-4 justify-center">
        <el-dropdown class="w-full p-2" trigger="click">
          <ElButton class="w-full" :icon="Plus" type="primary">
            Создать <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </ElButton>

          <template #dropdown>
            <el-dropdown-menu class="w-full">
              <div v-for="(button, index) in buttons" :key="`${index} - ${button.literals}`" class="w-full">
                <el-dropdown-item class="w-full" @click="emit('openCreateModal', button.literals)">
                  <div class="w-50">
                    {{ button.label }}
                  </div>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </aside>
    <ElDialog v-model="isSetOrderModalOpen" :title="`Задать порядок ${currentItem === 'stage' ? 'этапов' : currentItem === 'chapter' ? 'глав' : 'конспектов'}`">
      <div v-if="data?.stages" class="flex flex-col gap-4 p-4">
        <div class="grid grid-cols-4 gap-4">
          <div v-for="(item, index) in currentItemData" :key="`${item.id}-${currentItem}`" class="flex flex-col items-center gap-2">
            <p class="font-semibold">
              {{ item.title }}:
            </p>
            <ElInputNumber v-if="currentItemsOrder[index]?.orderIndex !== undefined" v-model="currentItemsOrder[index].orderIndex" />
          </div>
        </div>
        <ElButton type="primary" class="w-fit self-end" @click="handleSubmitNewOrder">
          Сохранить порядок
        </ElButton>
      </div>
    </ElDialog>
  </div>
</template>
