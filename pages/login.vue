<script setup lang="ts">
definePageMeta({
  layout: false,
})

const formData = ref({
  email: '',
  password: '',
})

const { login, isFetching } = useLogin()
async function handleLogin() {
  const { success: isSuccess, error } = await login(formData.value)
  if (isSuccess) {
    ElMessage.success('Авторизация прошла успешно')
    navigateTo('/')
    return
  }
  ElMessage.error(`Ошибка: ${error}`)
}
</script>

<template>
  <div class="h-screen bg-primary-50 w-full flex justify-center items-center">
    <div class="w-100 bg-white p-4 rounded">
      <div class="h-full flex mb-4">
        <h1 class="text-xl font-bold text-primary-500">
          Вход
        </h1>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <p class="text-xs opacity-50">
            Логин*
          </p>
          <ElInput
            v-model="formData.email"
            placeholder="Введите логин"
            type="email"
            size="large"
          />
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-xs opacity-50">
            Пароль*
          </p>
          <ElInput
            v-model="formData.password"
            placeholder="Введите пароль"
            type="password"
            show-password
            size="large"
          />
        </div>
        <ElButton :loading="isFetching" type="primary" @click="handleLogin">
          Войти
        </ElButton>
      </div>
      <div class="mt-4 text-sm hover:underline cursor-pointer">
        <NuxtLink to="/signup">
          Зарегистрироваться
        </NuxtLink>
      </div>
      <div class="mt-4 text-sm hover:underline cursor-pointer">
        <NuxtLink to="/">
          Вернуться
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
