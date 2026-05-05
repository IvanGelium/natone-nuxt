<script setup lang="ts">
import type { CreateModalType } from '~/types/utils'

defineProps<{
  modalType: CreateModalType
  updateId: number | null
}>()

const emit = defineEmits<{
  (e: 'closeDialog',): void
}>()
</script>

<template>
  <div class="w-full">
    <div>
      <div v-if="modalType === 'stage'">
        <ConspectCreateStage
          :update-id="updateId"
          @close-dialog="emit('closeDialog')"
        />
      </div>
      <div v-else-if="modalType === 'chapter'">
        <ConspectCreateChapter
          :update-id="updateId"
          @close-dialog="emit('closeDialog')"
        />
      </div>

      <div v-else-if="modalType === 'conspect'">
        <ConspectCreateConspect
          @close-dialog="emit('closeDialog')"
        />
      </div>
      <div v-else-if="modalType === 'practice'">
        <ConspectCreatePractice
          @close-dialog="emit('closeDialog')"
        />
      </div>
    </div>
  </div>
</template>
