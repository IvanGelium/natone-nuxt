<script setup lang="ts">
import Mdblock from '@/components/Mdblock.vue'
import { codeBlock } from '@/utils'

const content = `
Открываем последние 10 коммитов:
${codeBlock(
  `
  git rebase -i HEAD~10
  `,
  'CNS',
)}

И отмечаем нужные: 

${codeBlock(
  `
pick 5cc7894 # Сделал практику по коллекциям
fixup 76cfb43 # Добавил больше инфы по прототипу
pick 1595ead # Добавил страницу про оптимизацию
reword c828e1a # Начал делать практику по преобразованию, добавил класс FakeData
reword 0e88202 # Сделал последнюю практику
pick c0d04e5 # Бойлер плейт для главы про гит
pick 0cb4c0a # Апдейт названия: тестовый коммит
squash 2f94784 # Апдейт названия: И ещё один тестовый коммит
fixup 3ea5690 # Добавил конспект по ребейзу
fixup 6cda929 # c
  `,
  'TXT',
)}
Вносим в них правки.

Далее пушим новую историю в ремоут 

${codeBlock(
  `
git push --force-with-lease
  `,
  'SH',
)}
`
</script>

<template>
  <div>
    <Mdblock :content="content" />
  </div>
</template>
