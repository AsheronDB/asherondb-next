<template>
  <div>
    <PageBreadcrumb :page-title="pageTitle" />
    <PageHeader>{{ pageTitle }}</PageHeader>

    <div class="px-2">
      <UTable :columns :rows="servers">
        <template #name-data="{ row }">
          <nuxt-link :to="'/servers/' + row.guid">
            <p class="font-bold">{{ row.name }}</p>
          </nuxt-link>
        </template>
        <template #status-data="{ row }">
          <p class="text-xl text-center">{{ row.status.online ? "✅" : "❌" }}</p>
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

const pageTitle = ref("Server Tracker");

const columns = [
  {
    key: "status",
    label: "Status",
    class: "w-[0.1%] text-center",
  },
  {
    key: "name",
    label: "Name",
    class: "w-[0.1%]",
  },
  {
    key: "address",
    label: "Address",
  },
];
const { data } = useFetch("https://servers.treestats.net/api/servers/", {
  key: "servers",
});

const servers = computed(() =>
  data.value ? orderBy(data.value.servers, ["name"], ["asc"]) : []
);
</script>
