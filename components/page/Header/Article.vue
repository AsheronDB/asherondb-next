<template>
  <header class="mb-10 space-y-4 py-8">
    <div>
      <PageBreadcrumbPath :key="route.fullPath" />
    </div>
    <h2 class="text-primary-400 font-serif text-4xl font-bold">
      {{ route.meta.title }}
    </h2>
    <!-- <p class="text-gray-400">Guide to playing Asheron's Call on private emulator
      servers</p> -->
    <!-- <p class="text-gray-500 italic text-xs">Last updated April, 2024</p> -->
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
