<template>
  <div class="flex min-h-screen w-full flex-col gap-2 bg-primary-100 p-2">
    <Header />
    <main class="flex min-h-0 flex-1 gap-2">
      <Sidebar />
      <div class="h-full w-full flex-1 overflow-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
