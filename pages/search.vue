<template>
  <Page>
    <PageSearchResults
      :filter="filter"
      :results="results"
    />
  </Page>
</template>

<script setup lang="ts">
// TODO: Pagination

import type { AsyncData } from '#app';
import type { WeenieSearchListingRow } from '~/util/queries/new';
import { getWeeniesByName } from '~/util/queries/new';

const route = useRoute();

// It's important to use reactivity here so we refetch on client
const filter = computed(() => route.query.q)
const querySQL = computed(() => getWeeniesByName(filter.value))

const { data : results, error } = await useFetch(
  `https://acedb.treestats.net/ace_world_patches.json?_shape=array`,
  {
    key: "search",
    query: {
      sql: querySQL,
    },
  },
) as AsyncData<WeenieSearchListingRow[], Error>;

definePageMeta({
  title: "Search",
});
</script>
