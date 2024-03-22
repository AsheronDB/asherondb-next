<template>
  <div class="p-4">
    <header class="pb-4">
      <h2 class="font-bold">Server Tracker</h2>
    </header>

    <div>

      <h3 class="font-bold">Server: {{  server.server }}</h3>
    
      <ul>
        <li v-for="status in server.statuses">
        {{ status }}</li>
      </ul>

    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: server } = useFetch(`https://servers.treestats.net/api/statuses/${route.params.guid}`, {
  key: `server-${route.params.guid}`,
});

// const serverName = computed(() => statuses.value[0].name);

</script>
