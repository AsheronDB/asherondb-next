<template>
  <div>
    <p v-if="props.data.use">
      Wield requires level {{ props.data.use }}
    </p>
    <p v-if="!props.data.isSellable">
      This item cannot be sold.
    </p>
    <p v-if="props.data.spellcraft">Spellcraft: {{ props.data.spellcraft }}.</p>
    <p>{{ props.data.use }}</p>
    <p v-if="props.data.mana">Mana: {{ props.data.mana }} / {{ props.data.mana }}</p>
    <p v-if="props.data.mana">Mana Cost: {{ props.data.manaRateString }}</p>
  </div>
</template>

<script setup lang="ts">
import type { ItemData } from '~/models/Item';

const props = defineProps<{ data: ItemData }>();
</script>
