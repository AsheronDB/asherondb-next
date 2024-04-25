<template>
  <div class="max-w-96">
    <h3 class="border-primary-800 border-2 p-2 text-center font-serif">
      {{ data.name }}
    </h3>
    <div class="border-primary-800 border-2 border-y-0 p-2 font-serif">
      <component
        :is="view"
        :data="data"
      />
    </div>
    <div class="bg-primary-600 border-primary-800 border-2 p-4 font-serif text-gray-950">
      Inscription
    </div>
  </div>
</template>

<script setup lang="ts">
import WeenieWeaponMelee from "~/components/Weenie/Item/Weapon/Melee.vue"
import WeenieWeaponMissile from "~/components/Weenie/Item/Weapon/Missile.vue"
import WeenieWeaponCaster from "~/components/Weenie/Item/Weapon/Caster.vue"

import { WeenieType } from "~/util/mappings"
import type { WeenieData } from "~/models/Weenie"

const props = defineProps<{ data: WeenieData }>()
const { data } = toRefs(props)

const _weenieType = ref(null)

let view: Component

if (data.value?.type == WeenieType.MeleeWeapon) {
  view = WeenieWeaponMelee
}
else if (data.value?.type == WeenieType.MissileLauncher) {
  view = WeenieWeaponMissile
}
else if (data.value?.type == WeenieType.Caster) {
  view = WeenieWeaponCaster
}
else {
  throw new Error("Unsupported component")
}
</script>
