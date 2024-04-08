<template>
  <div class="flex flex-col gap-4">
    <div>
      <WeenieItemPropertiesBasic :data="props.data" />
    </div>
    <div>
      <div>Skill: {{ props.data.skillString }}</div>
      <div>Damage Bonus: {{ props.data.damageBonus }}</div>
      <div v-if="props.data.elementalDamageBonus">
        Elemental Damage Bonus: {{ props.data.elementalDamageBonus }},
        {{ props.data.elementalDamageTypeString }}.
      </div>
      <div>Damage Modifier: {{ props.data.damageMod }}%.</div>
      <div>Speed: {{ props.data.speedString }}</div>
      <div>Range: {{ props.data.range }}</div>
      <div>Uses {{ props.data.ammoTypeString }} as ammunition.</div>
      <div v-if="props.data.hasMeleeDefenseBonus">
        Bonus to Melee Defense: +{{ props.data.defenseString }}%
      </div>
      <!-- TODO: Magic Defense? -->
      <!-- TODO: Missile Defense? -->
    </div>
    <WeenieItemSpells
      v-if="props.data.spells.length > 0"
      :spells="props.data.spells"
    />
    <div v-if="props.data.propertyString">
      <div>Properties: {{ props.data.propertyString }}</div>
    </div>
    <div>
      <div v-if="props.data.wieldDifficulty">
        Wield requires level {{ props.data.wieldDifficulty }}
      </div>
      <WeenieItemPropertiesExtended :data="props.data" />
    </div>
    <div v-if="props.data.description">
      <div>{{ props.data.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MissileWeaponData } from '~/models/Weapon/MissileWeapon';

const props = defineProps<{ data: MissileWeaponData }>();
</script>
