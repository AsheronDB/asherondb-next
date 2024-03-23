<template>
  <div class="bg-red-950/40 px-6 py-3">
    <UBreadcrumb divider="i-heroicons-chevron-right-20-solid" :links="links" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const linksRoot = [
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
  }
];

const pages = route.matched.map((match) => ({
  label: match.meta.title,
  to: match.path,
}));

const links = computed(() => [...linksRoot, ...pages]);
</script>
