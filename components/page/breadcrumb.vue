<template>
  <div class="bg-acred-700 px-6 py-3">
    <UBreadcrumb divider="i-heroicons-chevron-right-20-solid" :links="links" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

console.log('BREADCRUMB setup')

const linksRoot = [
  {

    icon: "i-heroicons-home",
    to: "/",
  }
];

const pages = route.matched.filter(match => match.meta.title).map((match) => ({
  label: match.meta.title,
  to: match.path,
}));

const links = computed(() => [...linksRoot, ...pages]);
</script>
