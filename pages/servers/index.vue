<template>
  <Page>
    <template #deck>Last updated {{ lastUpdated }} ago</template>

    <div>
      <UTable :columns :rows="servers">
        <template #name-data="{ row }">
          <nuxt-link :to="'/servers/' + row.name">
            <p class="font-bold">
              {{ row.name }}
            </p>
          </nuxt-link>
        </template>
        <template #status-data="{ row }">
          <p class="text-xl text-center">
            {{ row.status.online ? "✅" : "❌" }}
          </p>
        </template>
        <template #address-data="{ row }">
          {{ row.address.host }}:{{ row.address.port }}
        </template>
      </UTable>
    </div>
  </Page>
</template>

<script setup lang="ts">
import { orderBy } from "lodash-es";
import { formatDistanceStrict } from "date-fns";

const store = useStore();
const { now } = storeToRefs(store);

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
const { data } = await useFetch("https://servers.treestats.net/api/servers/", {
  key: "servers",
});

const servers = computed(() =>
  data.value ? orderBy(data.value.servers, ["name"], ["asc"]) : []
);

const lastUpdated = computed(() =>
  data.value && data.value.last_checked
    ? formatDistanceStrict(data.value.last_checked, new Date(now.value))
    : "unknown"
);

definePageMeta({
  title: "Server Tracker",
});
</script>
