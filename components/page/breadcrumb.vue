<template>
  <div class="bg-red-950/40 p-4">
    <UBreadcrumb divider="i-heroicons-chevron-right-20-solid" :links="links" />
  </div>
</template>

<script setup lang="ts">

const props = defineProps(['pageTitle']);
const { pageTitle } = toRefs(props);

const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/'
}, {
  label: pageTitle.value
}]
</script>