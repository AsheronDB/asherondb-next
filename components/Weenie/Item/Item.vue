<template>
  <div class="flex flex-col gap-4">
    <div>
      <WeenieItemPropertiesBasic :data="props.data" />
    </div>
    <div v-if="props.data.propertyString">
      Properties: {{ props.data.propertyString }}
    </div>
    <div>
      <WeenieItemPropertiesExtended :data="props.data" />
    </div>
    <div>
      <div>{{ props.data.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ItemData } from "../../../models/Item"

const props = defineProps<{ data: ItemData }>()
</script>
