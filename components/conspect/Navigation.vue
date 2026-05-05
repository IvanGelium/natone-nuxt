<script setup lang="ts">
import type { CreateModalType } from '~/types/utils'
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
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
</script>

<template>
  <div class="h-full flex flex-col overflow-auto">
    <div class="sticky z-10 p-4 text-sm uppercase rounded-t-2xl bg-primary-50 tracking-wide text-secondary border border-primary-200">
      Разделы
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
              <div class="invisible gap-2 group-hover/stage:visible flex">
                <div
                  class="opacity-40 hover:opacity-100 transition-opacity rounded-full"
                  @click="emit('openUpdateModalStage', stage.id)"
                >
                  <Edit width="16" />
                </div>
                <div
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
                <div class="invisible gap-2 group-hover/chapter:visible flex">
                  <div
                    class="opacity-40 hover:opacity-100 rounded-full"
                    @click="emit('openUpdateModalChapter', chapter.id)"
                  >
                    <Edit width="16" />
                  </div>
                  <div
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
      <div class="mt-4 w-full flex flex-col gap-4 justify-center">
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
  </div>
</template>
