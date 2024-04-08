<template>
  <div>
    <header>
      <PageBreadcrumb v-if="route.meta.breadcrumb == true || route.meta.breadcrumb !== false" />
      <PageHeader v-if="route.meta.breadcrumb == true || route.meta.breadcrumb !== false">
        <template #deck>
          <slot name="deck" />
        </template>
      </PageHeader>
    </header>

    <div class="group-[.narrow]/layout:container group-[.narrow]/layout:mx-auto py-6">
      <slot />
    </div>
  </div>
</template>

  <script setup lang="ts">
  const route = useRoute();

  </script>
