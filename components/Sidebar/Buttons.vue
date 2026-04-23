<script setup lang="ts">
import { ArrowRight, Film, House, IceCream, QuartzWatch, ZoomIn } from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'

const props = defineProps<{
  isSideBarOpen: boolean
}>()
const emit = defineEmits<{
  (e: 'changeSideBar'): void
}>()
const { isSideBarOpen } = toRefs(props)
const route = useRoute()
const buttons = [
  {
    name: 'home',
    label: 'Главная',
    icon: House,
    route: '/',
    isReady: true,
  },
  {
    name: 'conspects',
    label: 'Конспекты',
    icon: Film,
    route: '/conspects',
    isReady: true,
  },
  {
    name: 'natoneStarfinder',
    label: 'Старфайндер',
    icon: IceCream,
    route: '/starfinder',
    isReady: false
  },
  {
    name: 'playground',
    label: 'Песочница',
    icon: IceCream,
    route: '/playground',
    isReady: true
  },
]

function handleArrowClick() {
  emit('changeSideBar')
}

const primaryButton = computed(() => route.path)
</script>

<template>
  <div class="flex flex-col overflow-hidden">
    <div class="flex flex-col gap-2">
      <div v-for="(button, index) in buttons" :key="`${index}-${button.label}`">
        <ElTooltip :content="button.label" placement="right">
          <div v-if="!isSideBarOpen">
            <NuxtLink :to="button.route">
              <ElButton
                class="min-w-full min-h-12"
                :disabled="button.isReady ? false : true"
                :icon="button.icon"
                :type="primaryButton === button.route ? 'primary' : 'default'"
              />
            </NuxtLink>
          </div>
        </ElTooltip>
        <div v-if="isSideBarOpen">
          <NuxtLink :to="button.route">
            <ElButton
              class="min-w-full min-h-12 flex gap-2"
              :disabled="button.isReady ? false : true"
              :icon="button.icon"
              :type="primaryButton === button.route ? 'primary' : 'default'"
            >
              {{ button.label }}
            </ElButton>
          </NuxtLink>
        </div>
      </div>
      <div class="flex  h-full">
        <div v-if="!isSideBarOpen" class="w-full">
          <ElButton
            class="w-full min-h-12"
            :icon="ArrowRight"
            @click="handleArrowClick"
          />
        </div>
        <div v-if="isSideBarOpen" class="w-full">
          <ElButton
            class="w-full min-h-12"
            :icon="ArrowRight"
            @click="handleArrowClick"
          >
            Свернуть
          </ElButton>
        </div>
      </div>
    </div>
  </div>
</template>
