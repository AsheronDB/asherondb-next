<template>
  <div
    class="group/layout narrow relative flex h-full flex-1 flex-col bg-gray-900"
  >
    <SiteHeader />
    <main class="flex flex-1 flex-col">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
