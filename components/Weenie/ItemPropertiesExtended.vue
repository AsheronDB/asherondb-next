<template>
  <div>
    <p v-if="props.data.use">
      Wield requires level {{ props.data.use }}
    </p>
    <p v-if="props.data.itemDifficulty">
      Activation requires Arcane Lore: {{ props.data.itemDifficulty }}
    </p>
    <p v-if="!props.data.isSellable">
      This item cannot be sold.
    </p>
    <p>Spellcraft: {{ props.data.spellcraft }}.</p>
    <p>{{ props.data.use }}</p>
    <p>Mana: {{ props.data.mana }} / {{ props.data.mana }}</p>
    <p>Mana Cost: {{ props.data.manaRateString }}</p>
  </div>
</template>

<script setup lang="ts">
import type { ItemData } from '~/models/Item';

const props = defineProps<{ data: ItemData }>();
</script>
