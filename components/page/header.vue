<template>
  <header class="bg-gray-800">
    <div class="px-6 py-6">
      <h2 class="text-2xl font-serif text-primary-200">{{  route.meta.title }}</h2>
    </div>
  </header>
</template>

<script setup lang="ts">

const route = useRoute();
</script>
