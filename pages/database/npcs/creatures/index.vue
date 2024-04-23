<template>
  <Page>
    <div>
      <UTable
        :columns
        :rows="creatures"
      >
        <template #name-data="{ row }">
          <nuxt-link :to="'/database/npcs/creatures/' + row.wcid">
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
            :total="totalPages"
          />
        </div>
      </div>
    </template>
  </Page>
</template>

<script setup lang="ts">
import type { AsyncData } from "#app"
import { WeenieType } from "~/util/mappings"
import { getCountOfWeenieByClassId, getWeenies, type CountResponse, type WeenieListingRow } from "~/util/queries/new"

// Set up pagination
const totalPages = ref(0) // Set to zero so we know it isn't set
const page = ref(1)
const perPage = ref(10)

definePageMeta({
  title: "Creatures",
})

// Count
const { data: count } = await useFetch(
  `https://acedb.treestats.net/ace_world_patches.json?_shape=array`,
  {
    key: "creatures-total",
    query: {
      sql: getCountOfWeenieByClassId([WeenieType.Creature]),
    },
  },
) as AsyncData<CountResponse[], Error>

totalPages.value = Math.round(Number(count.value[0].total) / perPage.value)

// Records
const { data: creatures, error: _error } = await useFetch(
  `https://acedb.treestats.net/ace_world_patches.json?_shape=array`,
  {
    key: "creatures",
    query: {
      sql: computed(() => getWeenies([WeenieType.Creature], page.value, perPage.value)),
    },
  },
) as AsyncData<WeenieListingRow, Error>

const columns = [
  {
    key: "wcid",
    label: "WCID",
    class: "w-[0.1%] text-center",
  },
  {
    key: "name",
    label: "Name",
  },
]
</script>
