<template>
  <div class="flex flex-col gap-2 py-2">
    <div>Showing {{ props.results.length }} results<span v-if="props.filter"> for query "{{ props.filter }}"</span>:</div>
    <div>
      <div
        v-for="r in props.results"
        :key="r.wcid"
      >
        <NuxtLink
          class="text-actan-500 hover:text-actan-800"
          :to="`/database/${weenieTypeURLMapThing[r.type]}/${r.wcid}`"
        >
          {{ r.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeenieSearchListingRow } from "~/util/queries/new"
import { weenieTypeURLMapThing } from "~/util/search"

const props = defineProps<{ filter: string, results: WeenieSearchListingRow[] }>()
</script>
