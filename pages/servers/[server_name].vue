<template>
  <Page>
    <!-- <template #kicker>
      Server Tracker
    </template> -->
    <div
      v-if="data"
      class="py-4"
    >
      <UTable
        :columns
        :rows="data.statuses"
      >
        <template #created_at-data="{ row }">
          {{ dateFormat(new Date(row.created_at), "yyyy-MM-dd '@' hh:mm:ss") }}
        </template>
      </UTable>
    </div>
  </Page>
</template>

<script setup lang="ts">
import { format as dateFormat } from "date-fns"

const route = useRoute()
const pageTitle = ref(null)

const columns = [
  {
    key: "status",
    label: "Status",
    class: "w-[0.1%] text-center",
  },
  {
    key: "created_at",
    label: "Checked At",
    class: "w-[0.1%]",
  },
  {
    key: "rtt",
    label: "RTT",
    class: "w-[0.1%]",
  },
  {
    key: "message",
    label: "Message",
  },
]

const { data } = await useFetch(
  `https://servers.treestats.net/api/statuses/${route.params.server_name}`,
  {
    key: `server-${route.params.server_name}`,
  },
)

// Handle error state

if (data.value) {
  console.log("")
  pageTitle.value = data.value.server
  route.meta.title = data.value.server
  route.matched[route.matched.length - 1].meta.title = data.value.server
}

useHead({
  title: () => pageTitle.value,
})

onMounted(() => {
  console.log("on mounted")
  console.log(pageTitle.value)
  if (data.value) {
    pageTitle.value = data.value.server
    route.meta.title = data.value.server
    route.matched[route.matched.length - 1].meta.title = data.value.server
  }
})
</script>
