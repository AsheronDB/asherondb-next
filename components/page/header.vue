<template>
  <header class="bg-gray-800 px-6 py-6 space-y-3 border-b border-gray-950">
    <!-- <p class="text-md font-serif leading-none text-gray-400" v-if="$slots.kicker">
        <slot name="kicker"></slot>
      </p> -->
    <!-- <p class="text-md font-serif leading-none text-gray-400" v-if="parentMatch">

      <nuxt-link :to="parentMatch.path">{{ parentMatch.title }}</nuxt-link>
    </p> -->

    <!-- <PageBreadcrumb class="opacity-50 "/> -->


    <h2 class="text-2xl font-serif leading-none text-primary-400">
      {{ route.meta.title }}
    </h2>
    <p
      v-if="$slots.deck"
      class="text-md font-serif text-gray-400"
    >
      <slot name="deck" />
    </p>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();

console.log(route);

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
