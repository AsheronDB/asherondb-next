<template>
  <Page>
    <!-- <PageBreadcrumb :key="title" /> -->
    <component :is="view" :data="weenie" />
    <!-- TODO: Links -->
  </Page>
</template>

<script setup lang="ts">
import WeenieWeaponMelee from "~/components/Weenie/Weapon/Melee.vue"
import WeenieWeaponMissile from "~/components/Weenie/Weapon/Missile.vue"
import WeenieWeaponCaster from "~/components/Weenie/Weapon/Caster.vue"

import { WeenieType } from '~/util/mappings';

const route = useRoute();
const title = ref("Weapon");

const wcid = route.params.wcid;
const weenie = ref();

definePageMeta({
  // title: weenie?.name, // Might need to make reactive, it's only a ref right now
  validate: async (route) => {
    if (
      typeof route.params.wcid !== "string" ||
      !/^\d+$/.test(route.params.wcid)
    ) {
      // TODO: Nuxt claims returning an object like this is how you set a
      // non-404 response but if you enable this block, you get an infinite
      // redirect. So we just return which sets 404 and makes us look dumb.
      //
      // See: https://nuxt.com/docs/getting-started/routing#route-validation
      //
      // return {
      // statusCode: 400, statusMessage: "Invalid value for weenie class ID."
      // }
      return false;
    }

    return true;
  },
});

const { data } = await useFetch(`/api/weenie/${wcid}`);
// TODO: Handle bad fetch
weenie.value = data.value?.data

// Dynamically decide component to use for rendering based on type
let view: Component

if (data.value?.data.type == WeenieType.MeleeWeapon) {
  view = WeenieWeaponMelee
} else if (data.value?.data.type == WeenieType.MissileLauncher) {
  view = WeenieWeaponMissile
} else if (data.value?.data.type == WeenieType.Caster) {
  view = WeenieWeaponCaster
} else {
  throw new Error("Unsupported component");
}

title.value = weenie?.value.name;
route.meta.title = weenie?.value.name;
route.matched[route.matched.length - 1].meta.title = weenie?.value.name;
</script>
