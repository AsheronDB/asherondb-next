<template>
  <div class="flex flex-col gap-4">
    <div>
      <WeenieItemPropertiesBasic :data="props.data" />
    </div>
    <div v-if="props.data.propertyString">
      <div>Properties: {{ props.data.propertyString }}</div>
    </div>
    <div>
      <div>Skill: {{ props.data.skillString }}</div>
      <div>Damage: {{ props.data.damageString }}</div>
      <div>Speed: {{ props.data.speedString }}</div>
      <div>Bonus to Attack Skill: {{ props.data.offenseString }}</div>
      <div>Speed to Melee Defense: {{ props.data.defenseString }}</div>
    </div>
    <WeenieItemSpells
      v-if="props.data.spells.length > 0"
      :spells="props.data.spells"
    />
    <div>
      <div v-if="props.data.wieldDifficulty">
        Wield requires level {{ props.data.wieldDifficulty }}
      </div>
      <div>
        Wield requires base {{ props.data.wieldRequirementSkillName }} {{
          props.data.wieldRequirementSkillValue }}
      </div>
      <div>Activation requires Arcane Lore: {{ props.data.itemDifficulty }}</div>
      <WeenieItemPropertiesExtended :data="props.data" />
    </div>
    <div>
      <div>{{ props.data.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MeleeWeaponData } from "~/models/Weapon/MeleeWeapon"

const props = defineProps<{ data: MeleeWeaponData }>()
</script>
