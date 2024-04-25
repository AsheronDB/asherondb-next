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

    <div class="py-6 group-[.narrow]/layout:container group-[.narrow]/layout:mx-auto">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
