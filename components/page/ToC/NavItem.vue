<template>
  <li>
    <a
      :href="'#' + id"
      :class="{ 'text-primary': isActive }"
      class="block text-sm truncate text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
    >
      {{ text }}
    </a>
    <ul
      v-if="children.length"
      class="space-y-1 nested-nav"
    >
      <NavItem
        v-for="(child, index) in children"
        :id="id"
        :key="index"
        :text="child.text"
        :active-ids="activeIds"
        :children="child.children"
      />
    </ul>
  </li>
</template>

<script setup>
import { defineProps } from 'vue';



const props = defineProps({
  activeIds: Array,
  text: String,
  id: String,
  children: Array
});

const { activeIds, id } = toRefs(props);

const isActive = computed(() => activeIds.value.includes(id.value));

</script>

<style>
.nested-nav {
  padding-left: 12px; /* Adjust indentation as needed */
}
.active {

  color: red;
}
</style>
