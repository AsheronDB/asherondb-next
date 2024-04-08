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
          <div class="flex flex-col gap-4">
            <div>
              <WeenieItemPropertiesBasic :data="props.data" />
            </div>
            <div>
              <div>Bonus to Melee Defense: {{ props.data.defenseString }}</div>
            </div>
            <SpellsList v-if="props.data.spells.length > 0" :spells="props.data.spells" />
            <div v-if="props.data.propertyString">
              <div>Properties: {{ props.data.propertyString }}</div>
            </div>
            <div>
              <div>Wield requires base {{ props.data.wieldRequirementSkillName }} {{
                props.data.wieldRequirementSkillValue }}</div>
              <div>Activation requires Arcane Lore: {{ props.data.itemDifficulty }}</div>
            </div>
            <div>
              <div>Bonus to Mana Conversion: +{{ props.data.manaConversionBonus }}%</div>
            </div>
            <div>
              <div>Damage bonus for {{ props.data.elementalDamageTypeString }} spells:</div>
              <div>vs. Monsters: +{{ props.data.elementalDamageModString }}%.</div>
              <div>vs. Players: +{{ props.data.elementalDamageModVsHumansString }}%.</div>
              <WeenieItemPropertiesExtended :data="props.data" />
            </div>
            <div>
              <div>{{ props.data.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CasterData } from '~/models/Weapon/Caster';

const props = defineProps<{ data: CasterData }>();
</script>
