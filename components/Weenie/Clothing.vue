<template>
  <div>
    <div class="py-4 space-y-4">
      <div class="border-2 border-primary-800 bg-primary-950 mb-6">
        <div class="border-b-2 border-primary-800 p-6">
          <h2 class="text-3xl font-serif text-primary-400 font-normal text-center">
            {{ props.data.name }}
          </h2>
        </div>
        <div class="flex w-full rounded-lg text-gray-800">
          <div class="mr-auto flex flex-1 items-center">
            <p class="p-6 text-gray-400">
              Icon
            </p>
          </div>
        </div>
      </div>
      <div class="grid gap-8 grid-cols-2 font-serif">
        <div class="border-2 border-primary-800">
          <h3 class="bg-primary-800 p-3 font-serif font-bold text-lg">
            Properties
          </h3>
          <!-- TODO: This isn't styled so please re-design as you wish -->
          <p>Value: {{ props.data.value }}</p>
          <p>Burden: {{ props.data.burden }}</p>
          <p class="pb-4">Covers {{ props.data.coverageString }}</p>
          <div class="pb-4">
            Armor Level: {{ props.data.armorLevel }}<br>
            Slashing: {{ props.data.armorLevelVsSlashPhrase }} ({{ props.data.armorLevelVsSlash }})<br>
            Piercing: {{ props.data.armorLevelVsPiercePhrase }} ({{ props.data.armorLevelVsPierce }})<br>
            Bludgeoning: {{ props.data.armorLevelVsBludgeonPhrase }} ({{ props.data.armorLevelVsBludgeon }})<br>
            Fire: {{ props.data.armorLevelVsFirePhrase }} ({{ props.data.armorLevelVsFire }})<br>
            Cold: {{ props.data.armorLevelVsColdPhrase }} ({{ props.data.armorLevelVsCold }})<br>
            Acid: {{ props.data.armorLevelVsAcidPhrase }} ({{ props.data.armorLevelVsAcid }})<br>
            Electric: {{ props.data.armorLevelVsElectricPhrase }} ({{ props.data.armorLevelVsElectric }})<br>
            Nether: {{ props.data.armorLevelVsNetherPhrase }} ({{ props.data.armorLevelVsNether }})<br>
          </div>
          <div>
            Properties: {{ props.data.propertyString }}
          </div>
          <WeenieItemProperties :data="props.data" />
          <p>
            {{ data.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ClothingData } from "../../models/Clothing";

const props = defineProps<{ data: ClothingData }>();
</script>
