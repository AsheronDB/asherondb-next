<template>
  <div>
    <PageBreadcrumb />
    <PageHeader />
    <div class="p-4">
      {{ route.params.race_handle }}
    </div>

  </div>
</template>
<script setup lang="ts">
const route = useRoute();

definePageMeta({
  title: "Player Race",
});

route.meta.title = route.params.race_handle;
route.matched[route.matched.length - 1].meta.title = route.params.race_handle;

</script>
