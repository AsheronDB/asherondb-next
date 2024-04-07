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
          <p>Value: {{ props.data.value }}</p>
          <p>Burden: {{ props.data.burden }}</p>
          <p>Properties: {{ props.data.propertyString }}</p>
          <p>Skill: {{ props.data.skillString }}</p>
          <p>Damage: {{ props.data.damageString }}</p>
          <p>Speed: {{ props.data.speedString }}</p>
          <!-- See props for remainder of information you can grab -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeaponData } from "../../models/Weapon";

const props = defineProps<{ data: WeaponData }>();
</script>
