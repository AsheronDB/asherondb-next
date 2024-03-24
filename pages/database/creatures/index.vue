<template>
  <div>
    <PageBreadcrumb />
    <PageHeader />
    <div class="px-4">
      <UTable :rows>
        <template #name-data="{ row }">
          <nuxt-link :to="'/database/creatures/' + row.name">
            <p class="font-bold">{{ row.name }}</p>
          </nuxt-link>
        </template>
        <!-- <template #status-data="{ row }">
        <p class="text-xl text-center">{{ row.status.online ? "✅" : "❌" }}</p>
      </template>
      <template #address-data="{ row }">
        {{ row.address.host }}:{{ row.address.port }}
      </template> -->
      </UTable>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
console.log(route);

const rows = [
  {
    name: "Cow",
  },
];

definePageMeta({
  title: "Creatures",
});
</script>
