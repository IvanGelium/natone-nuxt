<script setup lang="ts">
import { useDebounce } from '~/utils'

type passStatus = 'true' | 'empty' | 'false'
definePageMeta({
  layout: false,
})
const formData = ref({
  login: '',
  password: '',
  passwordCheck: '',
  name: '',
})
const isPassChecked = ref<passStatus>('empty')
const { debounced } = useDebounce(checkPassword, 500)
function checkPassword() {
  if (!formData.value.password) {
    isPassChecked.value = 'empty'
  }
  else {
    isPassChecked.value = formData.value.password === formData.value.passwordCheck ? 'true' : 'false'
  }
}
async function WIPfetch() {
  await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.value.name,
      email: formData.value.login,
      password: formData.value.password,
    }),

  })
}
</script>

<template>
  <div class="h-screen bg-primary-50 w-full flex justify-center items-center">
    <div class="w-100 bg-white p-4 rounded">
      <div class="h-full flex mb-4">
        <h1 class="text-xl font-bold text-primary-500">
          Регистрация
        </h1>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <p class="text-xs opacity-50">
            Логин*
          </p>
          <ElInput
            v-model="formData.login"
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
            size="large"
            show-password
            @input="debounced"
          />
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-xs opacity-50">
            Повторите пароль*
          </p>
          <ElInput
            v-model="formData.passwordCheck"
            placeholder="Введите пароль ещё раз"
            type="password"
            size="large"
            show-password
            @input="debounced"
          />
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-xs opacity-50">
            Имя*
          </p>
          <ElInput
            v-model="formData.name"
            placeholder="Введите ваше имя"
            size="large"
          />
        </div>
        <ElButton
          :disabled="isPassChecked !== 'true'" type="primary"
          @click="WIPfetch"
        >
          Зарегистрироваться
        </ElButton>
        <p v-if="isPassChecked === 'false'" class="text-xs text-error-500">
          Пароли должны совпадать
        </p>
      </div>
      <div class="mt-4 text-sm hover:underline cursor-pointer">
        <NuxtLink to="/login">
          Войти
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
