<template>
  <div>
    <p>Value: {{ props.data.value }}</p>
    <p>Burden: {{ props.data.burden }}</p>
  </div>
</template>

<script setup lang="ts">
import type { ItemData } from '~/models/Item';

const props = defineProps<{ data: ItemData }>();
</script>
