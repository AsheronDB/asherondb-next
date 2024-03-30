<template>
  <div class="bg-acred-700 px-6 py-3 border-b border-gray-950">
    <UBreadcrumb
      divider="i-heroicons-chevron-right-20-solid"
      :links="links"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

console.log("BREADCRUMB setup");

const linksRoot = [
  {

    icon: "i-heroicons-home",
    to: "/",
  }
];

// const pages = route.matched.filter(match => match.meta.title).map((match) => ({
//   label: match.meta.title,
//   to: match.path,
// }));

// const links = computed(() => [...linksRoot, ...pages]);

// const links = useBreadcrumbItems();

console.log(route);

const pathParts = route.fullPath.split("/").slice(1)

console.log(pathParts);

const newLinks = pathParts.map((part, index) => {
  const fullPath = '/' + pathParts.slice(0, index + 1).join('/')
  const match = router.resolve(fullPath);

  const obj = {
    label: match.meta.title,
    to: fullPath
  }

  return obj;
});

const links = [...linksRoot, ...newLinks];
</script>
