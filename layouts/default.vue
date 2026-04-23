<template>
  <div class="flex h-screen w-full flex-col gap-2 bg-primary-100 p-2 overflow-hidden">
    <Header />
    <main class="flex flex-1 min-h-0 gap-2">
      <Sidebar />
      <div class="w-full h-full min-h-0 flex-1 overflow-auto rounded-xl">
        <slot />
      </div>
    </main>
  </div>
</template>
