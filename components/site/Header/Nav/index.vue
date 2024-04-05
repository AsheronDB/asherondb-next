<template>
  <UButtonGroup
    size="md"
    orientation="horizontal"
  >
    <template
      v-for="navItem in primaryNav"
      :key="navItem.label"
    >
      <SiteHeaderNavPopover
        v-if="navItem.columns"
        :item="navItem"
      />
      <UDropdown
        v-else-if="navItem.children"
        mode="hover"
        :items="navItem.children"
        :popper="{ offsetDistance: 0, placement: 'bottom-start' }"
      >
        <UButton
          :label="navItem.label"
          color="acred"
          trailing-icon="i-heroicons-chevron-down-20-solid"
          size="md"
        />
      </UDropdown>
      <UButton
        v-else
        :label="navItem.label"
        color="acred"
        :to="navItem.to"
        size="md"
        :disabled="navItem.disabled"
      />
    </template>
  </UButtonGroup>
</template>

<script setup lang="ts">
const store = useStore();
const { primaryNav } = storeToRefs(store);


</script>
