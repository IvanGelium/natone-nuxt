<script setup lang="ts">
const diagram = `
graph TD
  Start([Начинаем работу]) --> Checkout[git checkout master]
  Checkout ---> Pull[git pull]
  Pull --> Branch[git checkout -b task_name]
  Branch --> Code[Пишем код]
  Code --> Commit[git commit -m '...']
  Commit --> Complete{Задача решена?}

  Complete -- Да --> isHasNotDependencies{Задачу можно залить отдельно?}
  Complete -- Нет --> Code

  isHasNotDependencies -- Да --> Test[Тестируем]
  Test --> Rebase[git rebase -i]
  isHasNotDependencies -- Нет --> Code
  
  Rebase --> Push[git push origin task_name]
  Push --> MR[Создаем новый MR в стейдж]
  MR --> StageConflicts{Есть конфликт с веткой?}

  StageConflicts -- Да --> Close[Закрываем MR]
  Close --> StageBranch[Создаем ветку от проблемной]
  StageBranch --> StageMerge[Мержим изменения в новую ветку]
  StageMerge --> StageRelosve[Решаем конфликт]
  StageRelosve --> StageConflicts

  StageConflicts -- Нет --> StageTest[Проверяем на Stage]

  StageTest --> StageBugs{Есть баги?}

  StageBugs -- Да --> Code
  StageBugs -- Нет --> ProdMR[Делаем MR в Prod]
  ProdMR --> End([Завершаем работу])
  
  style Start fill:#f9f,stroke:#333,stroke-width:2px
  style End fill:#bbf,stroke:#333,stroke-width:2px
`
</script>

<template>
  <div class="pl-100">
    <ClientOnly>
      <h1 class="text-4xl font-bold">
        Git-flow
      </h1>
      <VueMermaidString :value="diagram" />
    </ClientOnly>
  </div>
</template>
