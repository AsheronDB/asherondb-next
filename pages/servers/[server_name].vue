<template>
  <div>
    <PageBreadcrumb :key="pageTitle" />
    <PageHeader :key="pageTitle" />

    <div
      v-if="data"
      class="p-4"
    >
      <ul>
        <li
          v-for="status in data.statuses"
          :key="status.created_at"
        >
          {{ status }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const pageTitle = ref(null);

const { data, error } = await useFetch(
  `https://servers.treestats.net/api/statuses/${route.params.server_name}`,
  {
    key: `server-${route.params.server_name}`,
  }
);

console.log(data);

console.log(error);
if (data.value) {
  console.log("");
  pageTitle.value = data.value.server;
  route.meta.title = data.value.server;
  route.matched[route.matched.length - 1].meta.title = data.value.server;
}
// if ( data.value ) route.meta.title = data.value.server

// const serverName = computed(() => server.value && server.value.server ? server.value.server : '');

useHead({
  title: () => pageTitle.value,
});

onMounted(() => {
  console.log("on mounted");
  console.log(pageTitle.value);
  if (data.value) {
    pageTitle.value = data.value.server;
    route.meta.title = data.value.server;
    route.matched[route.matched.length - 1].meta.title = data.value.server;

  }
});

</script>
