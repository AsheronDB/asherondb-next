<template>
  <div>
    <header class="p-4">
      <h2 class="font-bold">Server Tracker</h2>
    </header>

    <div>
      <UTable :columns :rows="servers">
        <template #name-data="{ row }">
          <nuxt-link :to="'/servers/' + row.guid">{{ row.name }}</nuxt-link>
        </template>
        <template #status-data="{ row }">
          <span class="text-xl">{{ row.status.online ? "✅" : "❌" }}</span>
        
        </template>
        <template #address-data="{ row }">
          {{ row.address.host }}:{{ row.address.port }}
        </template>
      </UTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { orderBy } from "lodash-es";

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

const servers = computed(() => orderBy(data.value.servers, ["name"]));

</script>
