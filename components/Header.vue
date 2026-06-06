<script setup lang="ts">
const { logout } = (useAuth())
const keyInput = ref('')
const isAdmin = ref(false)
const { public: { baseApiUrl } } = useRuntimeConfig()

async function keyLogin() {
  const res = await $fetch(`/api/auth/key`, {
    method: 'POST',
    body: { key: keyInput.value },
  })
  if (res.access === 'granted') {
    isAdminStore.isAdmin.value = true
    isAdmin.value = isAdminStore.isAdmin.value
  }
}
</script>

<template>
  <div class="z-100 rounded-xl  flex h-12 justify-between px-2 items-center">
    <div class="logo font-extrabold text-xl">
      Основы Frontend-разработки - практика
    </div>
    <div v-if="!isAdmin" class="flex gap-2 items-center">
      <!-- <ElButton type="primary" @click="navigateTo('/login')">
        Войти
      </ElButton> -->
      <div class="flex gap-2 items-center">
        <p class="font-bold">
          KEY:
        </p>
        <ElInput v-model="keyInput" />
      </div>
      <ElButton
        type="primary" class="self-end" @click="keyLogin"
      >
        Вход
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
              {{ 'АДМИН' }}
            </h2>
          </div>
        </div>
      </ElTooltip>
    </div>
  </div>
</template>
