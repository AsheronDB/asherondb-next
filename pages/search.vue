<template>
  <Page>
    <template #deck>
      {{ resultsRange }}
    </template>
    <div>
      <UTable
        :columns
        :rows="results"
      >
        <template #name-data="{ row }">
          <nuxt-link :to="'/database/npcs/vendors/' + row.wcid">
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
          <UPagination
            v-model="page"
            :page-count="perPage"
            :total="total"
          />
        </div>
      </div>
    </template>
  </Page>



<!--

  <Page>
    <PageSearchResults
      :filter="filter"
      :results="results"
    />
  </Page> -->
</template>

<script setup lang="ts">
// TODO: Pagination

import type { AsyncData } from '#app';
import type { WeenieSearchListingRow } from '~/util/queries/new';
import { getSQLString, getWeeniesByName, getCountOfWeenieByName, type CountResponse } from '~/util/queries/new';

const route = useRoute();

const totalPages = ref(0); // Set to zero so we know it isn't set
const page = ref(1);
const perPage = ref(10);




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

if (count.value) totalPages.value = Math.round(Number(count.value[0].total) / perPage.value)

const total = computed(() => count.value ? count.value[0].total : 0);

const querySQL = computed(() => getSQLString(getWeeniesByName(filter.value, page.value, perPage.value)))

const { data : results, error } = await useFetch(
  `https://acedb.treestats.net/ace_world_patches.json?_shape=array`,
  {
    key: "search",
    query: {
      sql: querySQL,
    },
  },
) as AsyncData<WeenieSearchListingRow[], Error>;


// totalPages.value = Math.round(Number(results.value.length) / perPage.value)

const columns = [{
  key: 'name',
  label: 'Name'
}]
// definePageMeta({
//   titleTemplate: (title) => `${title} - Search - AsheronDB`
// });


route.meta.title = `Search: "${filter.value}"`;
route.matched[route.matched.length - 1].meta.title = `Search: "${filter.value}"`;


const resultsRange = computed(() => {
  const startIndex = (page.value - 1) * perPage.value + 1;
    const endIndex = Math.min(startIndex + perPage.value - 1, total.value);
    return `Showing results ${startIndex}-${endIndex} of ${total.value}`;
});

</script>
