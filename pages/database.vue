<template>
  <div>
    <PageBreadcrumb />
    <PageHeader />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">

const route = useRoute();

definePageMeta({
  title: "Database",
});
</script>
