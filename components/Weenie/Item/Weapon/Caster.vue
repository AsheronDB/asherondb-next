<template>
  <div class="flex flex-col gap-4">
    <div>
      <WeenieItemPropertiesBasic :data="props.data" />
    </div>
    <div>
      <div>Bonus to Melee Defense: {{ props.data.defenseString }}</div>
    </div>
    <WeenieSpells
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
      <div>
        Wield requires base {{ props.data.wieldRequirementSkillName }} {{
          props.data.wieldRequirementSkillValue }}
      </div>
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
</template>

<script setup lang="ts">
import type { CasterData } from '~/models/Weapon/Caster';

const props = defineProps<{ data: CasterData }>();
</script>
