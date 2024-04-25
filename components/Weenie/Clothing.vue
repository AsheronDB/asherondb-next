<template>
  <div>
    <div class="space-y-4 py-4">
      <div class="border-primary-800 bg-primary-950 mb-6 border-2">
        <div class="border-primary-800 border-b-2 p-6">
          <h2 class="text-primary-400 text-center font-serif text-3xl font-normal">
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
      <div class="grid grid-cols-2 gap-8 font-serif">
        <div class="border-primary-800 border-2">
          <h3 class="bg-primary-800 p-3 font-serif text-lg font-bold">
            Properties
          </h3>
          <div class="flex flex-col gap-4">
            <div>
              <div>Value: {{ props.data.value }}</div>
              <div>Burden: {{ props.data.burden }}</div>
            </div>
            <div>
              <div>Covers {{ props.data.coverageString }}</div>
            </div>
            <div>
              <div>Armor Level: {{ props.data.armorLevel }}</div>
              <div>Slashing: {{ props.data.armorLevelVsSlashPhrase }} ({{ props.data.armorLevelVsSlash }})</div>
              <div>Piercing: {{ props.data.armorLevelVsPiercePhrase }} ({{ props.data.armorLevelVsPierce }})</div>
              <div>
                Bludgeoning: {{ props.data.armorLevelVsBludgeonPhrase }} ({{ props.data.armorLevelVsBludgeon }})
              </div>
              <div>Fire: {{ props.data.armorLevelVsFirePhrase }} ({{ props.data.armorLevelVsFire }})</div>
              <div>Cold: {{ props.data.armorLevelVsColdPhrase }} ({{ props.data.armorLevelVsCold }})</div>
              <div>Acid: {{ props.data.armorLevelVsAcidPhrase }} ({{ props.data.armorLevelVsAcid }})</div>
              <div>
                Electric: {{ props.data.armorLevelVsElectricPhrase }} ({{ props.data.armorLevelVsElectric }})
              </div>
              <div>Nether: {{ props.data.armorLevelVsNetherPhrase }} ({{ props.data.armorLevelVsNether }})</div>
            </div>
            <WeenieSpells :spells="props.data.spells" />
            <div>
              Properties: {{ props.data.propertyString }}
            </div>
            <div>
              <div v-if="props.data.wieldDifficulty">
                Wield requires level {{ props.data.wieldDifficulty }}
              </div>
              <div>Activation requires Arcane Lore: {{ props.data.itemDifficulty }}</div>
              <WeenieItemPropertiesExtended :data="props.data" />
            </div>
            <div>
              {{ data.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ClothingData } from "../../models/Clothing"

const props = defineProps<{ data: ClothingData }>()
</script>
