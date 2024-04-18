<template>
  <div class="grid grid-cols-[32px_auto_100px]">
    <div class="grid place-items-center p-2">{{ props.icon }}</div>
    <div class="p-2">
      <NuxtLink
        to="/"
        class="text-actan-500 hover:text-actan-500 hover:underline font-bold"
        >{{ props.name }}</NuxtLink
      >
    </div>
    <div class="grid text-right p-2 text-gray-200 text-opacity-50">
      {{ props.category }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ icon: string; name: string; category: string }>();
</script>
