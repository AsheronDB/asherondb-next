<template>
  <header class="bg-gray-800 px-6 py-6 space-y-3">
    <!-- <p class="text-md font-serif leading-none text-gray-400" v-if="$slots.kicker">
        <slot name="kicker"></slot>
      </p> -->
    <p class="text-md font-serif leading-none text-gray-400" v-if="parentMatch">
      <!-- <slot name="kicker"></slot> -->

      <nuxt-link :to="parentMatch.path">{{ parentMatch.title }}</nuxt-link>
    </p>

    <h2 class="text-2xl font-serif leading-none text-primary-500">
      {{ route.meta.title }}
    </h2>
    <p class="text-md font-serif text-gray-400" v-if="$slots.deck">
      <slot name="deck"></slot>
    </p>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();

console.log(route);

const parentMatch = computed(() => {
  const matched = route.matched.filter(match => match.meta.title);
  if (matched.length > 1) {
    const parent = matched[matched.length - 2];

    return {
      title: parent.meta.title,
      path: parent.path,
    };
  } else {
    return null;
  }
});
</script>
