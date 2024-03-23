<template>
  <div class="bg-gray-950 text-white min-h-screen flex flex-col">
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "AsheronDB",
  titleTemplate: (title) => `${title} - AsheronDB`,
});
</script>
