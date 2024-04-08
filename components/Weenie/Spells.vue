<template>
  <div>
    Spells:
    <span v-for="spell in props.spells" v-bind:key="spell.id">
      <!-- TODO: Make colors look good -->
      <NuxtLink class="text-actan-500 hover:text-actan-800" :to="`/spells/${spell.id}`">{{ spell.name }}</NuxtLink>
      <!-- Put commas between spells except last -->
      <span v-if="spell.index != props.spells.length - 1">,&nbsp;</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { SpellData } from '~/models/Item';

const props = defineProps<{ spells: SpellData[] }>();
</script>
