<template>
  <div class="bg-gray-900 h-full flex-1 flex flex-col relative group/layout three-column narrow">
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
