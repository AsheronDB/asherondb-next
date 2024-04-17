<template>
  <Page :key="filter">
    <!-- <template #deck>
      {{ resultsRange }}
    </template> -->
    <div>
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

    <template #footer>
      <div class="bg-gray-800/50 p-4 border-t border-gray-950">
        <div class="group-[.narrow]/layout:container group-[.narrow]/layout:mx-auto">
          <PagePagination
            v-model="offset"
            :offset-size="offsetSize"
            :total
          />
          <!-- <UPagination
            v-model="page"
            :page-count="perPage"
            :total="total"
          /> -->
        </div>
      </div>
    </template>
  </Page>
</template>

<script setup lang="ts">
// TODO: Pagination

import type { AsyncData } from '#app';
import type { WeenieSearchListingRow } from '~/util/queries/new';
import { getSQLString, getWeeniesByName, getCountOfWeenieByName, type CountResponse } from '~/util/queries/new';
import { weenieTypeURLMapThing } from "~/util/search"

const route = useRoute();

const totalPages = ref(0); // Set to zero so we know it isn't set
const page = ref(1);
const offsetSize = ref(50);
const offset = ref(0);

// It's important to use reactivity here so we refetch on client
const filter = computed(() => route.query.q)

// Count
const { data: count } = await useFetch(
  `https://acedb.treestats.net/ace_world_patches.json?_shape=array`,
  {
    key: "search-total",
    query: {
      sql: getCountOfWeenieByName(filter.value),
    },
  }
) as AsyncData<CountResponse[], Error>;

// if (count.value) totalPages.value = Math.round(Number(count.value[0].total) / offsetSize.value)
const total = computed(() => count.value ? count.value[0].total : 0);

const querySQL = computed(() => getSQLString(getWeeniesByName(filter.value, offset.value, offsetSize.value)))

const { data : results, error } = await useFetch(
  `https://acedb.treestats.net/ace_world_patches.json?_shape=array`,
  {
    key: "search",
    query: {
      sql: querySQL,
    },
  },
) as AsyncData<WeenieSearchListingRow[], Error>;


// const resultsRange = computed(() => {
//   const startIndex = (page.value - 1) * perPage.value + 1;
//     const endIndex = Math.min(startIndex + perPage.value - 1, total.value);
//     return `Showing results ${startIndex}-${endIndex} of ${total.value}`;
// });

const columns = [{
  key: 'name',
  label: 'Name'
}]

watch(offset, async () => {

  window.scrollTo(0, 0);

  const query = {
    q: route.query.q
  }

  if (offset.value > 0) query.offset = offset.value;


  await navigateTo({
    query: query
  })


});

watch(filter, async () => {
  route.meta.title = `Search: "${filter.value}"`;
  route.matched[route.matched.length - 1].meta.title = `Search: "${filter.value}"`;
});

route.meta.title = `Search: "${filter.value}"`;
route.matched[route.matched.length - 1].meta.title = `Search: "${filter.value}"`;



</script>
