<script setup lang="ts">
const { user, logout } = (useAuth())
</script>

<template>
  <div class="z-100 rounded-xl  flex h-12 justify-between px-2 items-center">
    <div class="logo font-extrabold text-xl">
      Основы Frontend-разработки - практика
    </div>
    <div v-if="!user">
      <ElButton type="primary" @click="navigateTo('/login')">
        Войти
      </ElButton>
    </div>
    <div v-else class="mr-4">
      <ElTooltip content="Выйти?">
        <div
          class="flex gap-2 items-center hover:bg-primary-200 p-3 rounded-xl"
          @click="logout"
        >
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
