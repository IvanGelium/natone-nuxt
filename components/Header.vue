<script setup lang="ts">
import { ArrowRightBold } from '@element-plus/icons-vue';
const { user, logout } = (useAuth())
</script>

<template>
  <div class="z-100 rounded-xl  flex h-12 justify-between px-2 items-center">
    <div class="logo font-extrabold text-xl">
      Основы Frontend-разработки - практика
    </div>
    <div v-if="!user">
      <ElButton @click="navigateTo('/login')" type="primary">
        Войти
      </ElButton>
    </div>
    <div class="mr-4" v-else>
      <ElTooltip content="Выйти?">
        <div 
        @click="logout"
        class="flex gap-2 items-center hover:bg-primary-200 p-3 rounded-xl">
         <div>
            <h2 class="text-xl font-bold">
              {{ user.name }}
            </h2>
         </div>
        </div>
      </ElTooltip>
    </div>
  </div>
</template>
