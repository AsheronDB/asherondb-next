<template>
  <div>
    <div class="py-4 space-y-4">
      <div class="border-2 border-primary-800 bg-primary-950 mb-6">
        <div class="border-b-2 border-primary-800 p-6">
          <h2 class="text-3xl font-serif text-primary-400 font-normal text-center">
            {{ props.data.name || "???" }}
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
              <div>Skill: {{ props.data.skillString }}</div>
              <div>Damage Bonus: {{ props.data.damageBonus }}</div>
              <div v-if="props.data.elementalDamageBonus">
                Elemental Damage Bonus: {{ props.data.elementalDamageBonus }},
                {{ props.data.elementalDamageTypeString }}.</div>
              <div>Damage Modifier: {{ props.data.damageMod }}%.</div>
              <div>Speed: {{ props.data.speedString }}</div>
              <div>Range: {{ props.data.range }}</div>
              <div>Uses {{ props.data.ammoTypeString }} as ammunition.</div>
              <div v-if="props.data.hasMeleeDefenseBonus">Bonus to Melee Defense: +{{ props.data.defenseString }}%</div>
              <!-- TODO: Magic Defense? -->
              <!-- TODO: Missile Defense? -->
            </div>
            <div v-if="props.data.spells.length > 0">
              Spells:
              <span v-for="spell in props.data.spells" v-bind:key="spell.id">
                <NuxtLink :to="`/spells/${spell.id}`">{{ spell.name }}</NuxtLink>
                <span v-if="spell.index != props.data.spells.length - 1">,&nbsp;</span>
              </span>
            </div>
            <div v-if="props.data.propertyString">
              <div>Properties: {{ props.data.propertyString }}</div>
            </div>
            <div>
              <WeenieItemPropertiesExtended :data="props.data" />
            </div>
            <div v-if="props.data.description">
              <div>{{ props.data.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MissileWeaponData } from '~/models/Weapon/MissileWeapon';

const props = defineProps<{ data: MissileWeaponData }>();
</script>
