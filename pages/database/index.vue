<template>
  <div>
    <PageBreadcrumb />
    <PageHeader />
    <div class="p-4">
      Database home
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
console.log(route);

definePageMeta({
  title: "Database",
});
</script>
