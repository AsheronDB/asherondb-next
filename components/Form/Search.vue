<template>
  <div
    ref="container"
    class="relative flex flex-col gap-2 p-2"
  >
    <input
      id="search"
      ref="el"
      v-model="text"
      type="text"
      class="px-2 py-1 w-100"
      aria-label="Search"
      placeholder="Start typing to search..."
      @click="openDropdown"
      @focus="openDropdown"
      @keyup="onKeyUp"
    >
    <div class="absolute top-10 left-0 p-2">
      <div
        ref="dropdown"
        class="bg-gray-800 border border-gray-600 rounded p-2"
        :class="isShowingClass"
      >
        <div
          v-if="!results"
          class="w-full"
        >
          No results to show.
        </div>
        <!-- Results overflow container -->
        <div
          class="max-h-96 overflow-y-scroll"
        >
          <UTabs
            v-if="results"
            :items="tabs"
            class="w-full"
          >
            <template #item="{ item }">
              <!-- TODO: Sections are hard-coded right now! -->
              <div v-if="item.key === 'all'">
                <FormSearchDropdownRow
                  v-for="result in results.items"
                  :key="result.name"
                  icon="🗺️"
                  :name="result.name"
                  :category="result.category"
                  :subcategory="result.subcategory"
                  :url="result.url"
                />
              </div>
              <div v-if="item.key === 'item'">
                <FormSearchDropdownRow
                  v-for="result in results.items.filter(
                    (i) => i.category === 'item',
                  )"
                  :key="result.name"
                  icon="🗺️"
                  :name="result.name"
                  :category="result.category"
                  :subcategory="result.subcategory"
                  :url="result.url"
                />
              </div>
              <div v-if="item.key === 'character'">
                <FormSearchDropdownRow
                  v-for="result in results.items.filter(
                    (i) => i.category === 'character',
                  )"
                  :key="result.name"
                  icon="🗺️"
                  :name="result.name"
                  :category="result.category"
                  :subcategory="result.subcategory"
                  :url="result.url"
                />
              </div>
              <div v-if="item.key === 'world'">
                <FormSearchDropdownRow
                  v-for="result in results.items.filter(
                    (i) => i.category === 'world',
                  )"
                  :key="result.name"
                  icon="🗺️"
                  :name="result.name"
                  :category="result.category"
                  :subcategory="result.subcategory"
                  :url="result.url"
                />
              </div>
              <div v-if="item.key === 'other'">
                <FormSearchDropdownRow
                  v-for="result in results.items.filter(
                    (i) => i.category === 'other',
                  )"
                  :key="result.name"
                  icon="🗺️"
                  :name="result.name"
                  :category="result.category"
                  :subcategory="result.subcategory"
                  :url="result.url"
                />
              </div>
            </template>
          </UTabs>
        </div>
        <div
          v-if="results"
          class="text-right p-2"
        >
          <NuxtLink
            class="text-actan-500 hover:text-actan-500"
            :to="`/search?q=${text}`"
            @click="closeDropdown"
          >
            See All Results 👉
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";

// Element refs
const container = ref(null);
const text = ref("");
const el = ref(null);
const dropdown = ref(null);
const results = ref();

// UI State
const isShowing = ref(false);

// TODO: Can simplify this if we want
const isShowingClass = computed(() => {
  if (isShowing.value) {
    return "visible";
  } else {
    return "hidden";
  }
});

// Bound to @focus and @click on <input> box so we can show dropdown
// automatically
const openDropdown = function () {
  isShowing.value = true;
};

const closeDropdown = function () {
  isShowing.value = false;
};

const debouncedFetch = useDebounceFn($fetch, 300);

const onKeyUp = async function (e: KeyboardEvent) {
  // Do nothing if the input is empty
  if (text.value.length <= 0) {
    return;
  }

  const data = await debouncedFetch(`/api/search?q=${text.value}`);

  results.value = data;
};

const tabs = computed(() => {
  return [
    {
      key: "all",
      label: `All (${results.value.items.length})`
    },
    {
      key: "item",
      label: `Item (${results.value.items.filter(i => i.category === 'item').length})`
    },
    {
      key: "character",
      label: `Character (${results.value.items.filter(i => i.category === 'character').length})`
    },
    {
      key: "world",
      label: `World (${results.value.items.filter(i => i.category === 'world').length})`
    },
    {
      key: "other",
      label: `Other (${results.value.items.filter(i => i.category === 'other').length})`
    }
  ]
})

// Only close the dropdown when we click anywhere and
//
// 1. It's already open
// 2. We didn't just click inside the dropdown
//
// TODO: Maybe this can be more Vue-like.
onMounted(() => {
  if (!document) {
    return;
  }

  document.addEventListener("click", function (e: MouseEvent) {
    // Don't do anything if we're not showing the dropdown
    if (!isShowing.value) {
      return;
    }

    // Return now just in case container isn't set
    if (!container.value) {
      return;
    }

    // Don't hide if we clicked inside the container
    if (container.value.contains(e.target)) {
      return;
    }

    isShowing.value = false;
  });
});
</script>
