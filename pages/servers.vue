<template>
  <div>
    <header class="p-4">
      <h2 class="font-bold">Server Tracker</h2>
    </header>
    

    <div>
      <UTable :columns :rows="servers">
        <template #status-data="{ row }">
          {{ row.status.online }}
        </template>
        <template #address-data="{ row }">
          {{ row.address.host }}:{{ row.address.port }}
        </template>
      </UTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { orderBy } from "lodash-es"

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "address",
    label: "Address",
  },
];
const { data } = useFetch("https://servers.treestats.net/api/servers/", {
  key: "servers",
});

const servers = computed(() => orderBy(data.value, ['name']));
</script>
