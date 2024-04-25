<template>
  <header class="space-y-3 border-b border-gray-950 bg-gray-800 p-6">
    <div
      class="group-[.narrow]/layout:container group-[.narrow]/layout:mx-auto"
    >
      <p
        v-if="$slots.kicker"
        class="text-md mb-3 font-serif leading-none text-gray-400"
      >
        <slot name="kicker" />
      </p>
      <!-- <p class="text-md font-serif leading-none text-gray-400" v-if="parentMatch">

      <nuxt-link :to="parentMatch.path">{{ parentMatch.title }}</nuxt-link>
    </p> -->

      <!-- <PageBreadcrumb class="opacity-50 "/> -->

      <h2 class="text-primary-400 mb-1 font-serif text-2xl leading-none">
        {{ route.meta.title }}
      </h2>
      <p
        v-if="$slots?.deck"
        class="font-serif text-sm text-gray-400"
      >
        <slot name="deck" />
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

console.log(route)

// const parentMatch = computed(() => {
//   const matched = route.matched.filter(match => match.meta.title);
//   if (matched.length > 1) {
//     const parent = matched[matched.length - 2];

//     return {
//       title: parent.meta.title,
//       path: parent.path,
//     };
//   } else {
//     return null;
//   }
// });
</script>
