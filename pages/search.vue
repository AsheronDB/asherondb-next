<template>
  <Page :key="filter">
    <!-- <template #deck>
      {{ resultsRange }}
    </template> -->
    <div class="py-6">
      <div class="rounded-lg border border-gray-950">
        <div class="flex justify-end rounded-t-lg border-b-2 border-gray-700 bg-gray-800 p-4">
          <PagePagination
            v-model="offset"
            :offset-size="offsetSize"
            :total
          />
        </div>

        <div class="rounded-b-lg bg-gray-800/40">
          <UTable
            :columns
            :rows="results"
          >
            <template #name-data="{ row }">
              <nuxt-link :to="`/database/${weenieTypeURLMapThing[row.type]}/${row.wcid}`">
                <p class="font-bold">
                  {{ row.name }}
                </p>
              </nuxt-link>
            </template>
          </UTable>
        </div>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
// TODO: Pagination

import type { AsyncData } from "#app"
import type { WeenieSearchListingRow, getWeeniesByName, getCountOfWeenieByName, CountResponse } from "~/util/queries/new"
import { weenieTypeURLMapThing } from "~/util/search"

const route = useRoute()

const _totalPages = ref(0) // Set to zero so we know it isn't set
const _page = ref(1)
const offsetSize = ref(50)
const offset = ref(0)

// It's important to use reactivity here so we refetch on client
const filter = computed(() => route.query.q)

// Count
const countQueryParams = computed(() => {
  return {
    sql: getCountOfWeenieByName(),
    name: `%${filter.value}%`,
  }
})
const { data: count } = await useFetch(
  `https://acedb.treestats.net/ace_world_patches.json?_shape=array`,
  {
    key: "search-total",
    query: countQueryParams,
  },
) as AsyncData<CountResponse[], Error>

// if (count.value) totalPages.value = Math.round(Number(count.value[0].total) / offsetSize.value)
const total = computed(() => count.value ? count.value[0].total : 0)

const queryParams = computed(() => {
  return {
    sql: getWeeniesByName(offset.value, offsetSize.value),
    name: `%${filter.value}%`,
  }
})

const { data: results, error: _error } = await useFetch(
  `https://acedb.treestats.net/ace_world_patches.json?_shape=array`,
  {
    key: "search",
    query: queryParams,
  },
) as AsyncData<WeenieSearchListingRow[], Error>

// const resultsRange = computed(() => {
//   const startIndex = (page.value - 1) * perPage.value + 1;
//     const endIndex = Math.min(startIndex + perPage.value - 1, total.value);
//     return `Showing results ${startIndex}-${endIndex} of ${total.value}`;
// });

const columns = [{
  key: "name",
  label: "Name",
}]

watch(offset, async () => {
  window.scrollTo(0, 0)

  const query = {
    q: route.query.q,
  }

  if (offset.value > 0) query.offset = offset.value

  await navigateTo({
    query: query,
  })
})

watch(filter, async () => {
  route.meta.title = `Search: "${filter.value}"`
  route.matched[route.matched.length - 1].meta.title = `Search: "${filter.value}"`
})

route.meta.title = `Search: "${filter.value}"`
route.matched[route.matched.length - 1].meta.title = `Search: "${filter.value}"`
</script>
