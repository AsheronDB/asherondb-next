<template>
  <div class="grid grid-cols-[32px_auto_100px]">
    <div class="grid place-items-center p-2">
      {{ SearchResultSubCategoryIcon[props.subcategory] }}
    </div>
    <div class="p-2">
      <NuxtLink
        :to="props.url"
        class="font-bold text-actan-500 hover:text-actan-500 hover:underline"
      >
        {{ props.name }}
      </NuxtLink>
    </div>
    <div class="grid p-2 text-right text-gray-200 text-opacity-50">
      {{ SearchResultSubCategoryLabel[props.subcategory] }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchResultSubCategoryLabel, SearchResultSubCategoryIcon } from "~/util/search"

const props = defineProps<{
  name: string
  category: string
  subcategory: string
  url: string
}>()
</script>
