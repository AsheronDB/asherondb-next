<template>
  <div ref="container" class="flex flex-col gap-2 p-2">
    <input
      id="search"
      type="text"
      class="px-2 py-1 w-100"
      ref="el"
      v-model="text"
      @click="onClick"
      @keyup="onKeyUp"
      aria-label="Search"
      placeholder="Start typing to search..."
    />
    <div
      ref="dropdown"
      class="bg-gray-800 border border-gray-600 rounded p-2"
      :class="isShowingClass"
    >
      <div>
        <UTabs :items="items" class="w-full">
          <template #item="{ item }">
            <div v-if="item.key === 'all'">
              <FormSearchDropdownRow icon="🗺️" name="Shoushi" category="Zone" />
              <FormSearchDropdownRow
                icon="🛡️"
                name="Greenmire Cuirass"
                category="Armor"
              />
              <FormSearchDropdownRow
                icon="🗡️️"
                name="Greenmire Yari"
                category="Weapon"
              />
              <FormSearchDropdownRow
                icon="👺"
                name="Mosswart Shaman"
                category="Monster"
              />
              <FormSearchDropdownRow icon="💰" name="Pyreal" category="Item" />
            </div>
            <div v-if="item.key === 'zones'">
              <FormSearchDropdownRow icon="🗺️" name="Shoushi" category="Zone" />
            </div>
            <div v-if="item.key === 'armor'">
              <FormSearchDropdownRow
                icon="🛡️"
                name="Greenmire Cuirass"
                category="Armor"
              />
            </div>
            <div v-if="item.key === 'weapons'">
              <FormSearchDropdownRow
                icon="🗡️️"
                name="Greenmire Yari"
                category="Weapon"
              />
            </div>
            <div v-if="item.key === 'monsters'">
              <FormSearchDropdownRow
                icon="👺"
                name="Mosswart Shaman"
                category="Monster"
              />
            </div>
            <div v-if="item.key === 'items'">
              <FormSearchDropdownRow icon="💰" name="Pyreal" category="Item" />
            </div>
          </template>
        </UTabs>
      </div>
      <div class="text-right p-2">
        <NuxtLink class="text-actan-500 hover:text-actan-500" to="/search"
          >See All Results 👉</NuxtLink
        >
      </div>
    </div>
    {{ text }}
  </div>
</template>

<script setup lang="ts">
// Element refs
const container = ref(null);
const text = ref("");
const el = ref(null);
const dropdown = ref(null);

// State
const isShowing = ref(false);

// TODO: Can simplify this if we want
const isShowingClass = computed(() => {
  if (isShowing.value) {
    return "visible";
  } else {
    return "hidden";
  }
});

const onClick = function (e: MouseEvent) {
  isShowing.value = true;
};

const onKeyUp = function (e: KeyboardEvent) {
  // TODO: Hook this up to API, debounce, etc.
};

// TODO: Hook this into API so we only show tabs we need
const items = [
  {
    key: "all",
    label: "All",
  },
  {
    key: "zones",
    label: "Zones",
  },
  {
    key: "armor",
    label: "Armor",
  },
  {
    key: "weapons",
    label: "Weapons",
  },
  {
    key: "monsters",
    label: "Monsters",
  },
  {
    key: "items",
    label: "Items",
  },
];

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
