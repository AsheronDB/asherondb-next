<template>
  <div class="group/layout three-column narrow relative flex h-full flex-1 flex-col bg-gray-900">
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
