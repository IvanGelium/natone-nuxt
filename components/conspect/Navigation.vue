<script setup lang="ts">
import type { CreateModalType } from '~/types/utils'
import { Plus } from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'

defineProps<{
  currentPageId: number | null
}>()

const emit = defineEmits<{
  (e: 'changePage', pageId: number): void
  (e: 'openCreateModal', modalType: CreateModalType): void
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
    <aside class="h-full overflow-scroll min-h-0 rounded-b-2xl border border-primary-200 bg-secondary p-4 shadow-sm">
      <!-- <div class="flex flex-col gap-4">
        <div v-for="(chapter, chapterIndex) in chapters" :key="`${chapterIndex}-${chapter.title}`" class="flex flex-col gap-2">
          <div class="flex gap-2 items-center">
            <div class="text-lg font-semibold">
              {{ chapter.title }}
            </div>
            -
            <div>
              {{ chapter.pages.length }}
            </div>
          </div>
          <div v-if="chapter.pages.length" class="flex flex-col gap-1">
            <button
              v-for="(page, pageIndex) in chapter.pages"
              :key="`${pageIndex}-${page}`"
              class="w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-primary-100"
              :class="currentPage === page ? 'bg-primary-400 text-white hover:bg-primary-500' : 'text-secondary'"
              @click="emit('changePage', chapterIndex, pageIndex)"
            >
              <p>
                {{ page }}
              </p>
            </button>
          </div>
          <div v-else class="rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm text-secondary">
            Материалы готовятся
          </div>
        </div>
      </div> -->
      <div v-if="data" class="flex flex-col gap-4">
        <div
          v-for="stage in data.stages"
          :key="`${stage.title}-${stage.id}`"
          class="flex flex-col gap-2 text-xl"
        >
          {{ stage.title }}
          <div
            v-for="chapter in stage.chapters"
            :key="`${chapter.title}-${chapter.id}`"
            class="flex flex-col gap-2 text-lg px-2 py-2"
          >
            {{ chapter.title }}
            <div
              v-for="conspect in chapter.conspects"
              :key="`${conspect.title}-${conspect.id}`"
            >
              <p
                class="cursor-pointer w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-primary-100"
                :class="currentPageId === conspect.id ? 'bg-primary-400 text-white hover:bg-primary-500' : 'text-secondary'"
                @click="emit('changePage', conspect.id)"
              >
                {{ conspect.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 w-full flex flex-col gap-4 justify-center">
        <el-dropdown class="w-full" trigger="click">
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
