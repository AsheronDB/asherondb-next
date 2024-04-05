<template>
  <header class="space-y-4 mb-10 py-8">
    <div>
      <PageBreadcrumbPath :key="route.fullPath" />
    </div>
    <h2 class="text-4xl font-bold font-serif text-primary-400">
      {{ route.meta.title }}
    </h2>
    <!-- <p class="text-gray-400">Guide to playing Asheron's Call on private emulator
      servers</p> -->
    <!-- <p class="text-gray-500 italic text-xs">Last updated April, 2024</p> -->
  </header>
</template>
<script setup lang="ts">
const route = useRoute();
</script>
