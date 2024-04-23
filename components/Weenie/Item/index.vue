<template>
  <div class="max-w-96">
    <h3 class="border-2 border-primary-800 p-2 font-serif text-center">
      {{ data.name }}
    </h3>
    <div class="p-2 border-2 border-t-0 border-b-0 border-primary-800 font-serif">
      <component
        :is="view"
        :data="data"
      />
    </div>
    <div class="bg-primary-600 text-gray-950 p-4 border-2 border-primary-800 font-serif">
      Inscription
    </div>
  </div>
</template>

<script setup lang="ts">
import WeenieWeaponMelee from "~/components/Weenie/Item/Weapon/Melee.vue"
import WeenieWeaponMissile from "~/components/Weenie/Item/Weapon/Missile.vue"
import WeenieWeaponCaster from "~/components/Weenie/Item/Weapon/Caster.vue"

import { WeenieType } from "~/util/mappings"

const props = defineProps(["data"])
const { data } = toRefs(props)

const weenieType = ref(null)

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
