<template>
  <div>
    <div class="p-4 space-y-4">
      <div class="border-2 border-primary-800 bg-primary-950 mb-6">
        <div class="border-b-2 border-primary-800 p-6">
          <h2
            class="text-3xl font-serif text-primary-400 font-normal text-center"
          >
            {{ props.data.name }}
          </h2>
        </div>
        <div class="flex w-full rounded-lg text-gray-800">
          <div class="mr-auto flex flex-1 items-center">
            <p class="p-6 text-gray-400">
              Icon
            </p>
          </div>
          <nav
            class="flex-0 hidden items-center lg:flex text-center p-3 font-serif font-normal text-gray-400"
          >
            {{ props.data.creatureTypeName }}<br>Title<br>Attackable
          </nav>
          <div class="ml-auto flex flex-1 justify-end items-stretch">
            <div
              class="border-l-2 border-primary-800 px-6 py-3 text-center leading-none flex flex-col items-center justify-center"
            >
              <p class="text-gray-400 text-sm font-serif leading-none">
                Level
              </p>
              <p
                class="text-primary-400 text-4xl font-normal font-serif leading-none"
              >
                {{ props.data.level }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid gap-8 grid-cols-2 font-serif">
        <div class="border-2 border-primary-800">
          <h3 class="bg-primary-800 p-3 font-serif font-bold text-lg">
            Attributes
          </h3>
          <table class="w-full">
            <tr
              v-for="(attribute, name) in props.data.attributes"
              :key="name"
            >
              <th class="text-left font-serif capitalize pl-3 py-1">
                {{ name }}
              </th>
              <td class="text-right font-serif pr-3 py-1">
                {{ attribute }}
              </td>
            </tr>

            <tr
              v-for="(vital, name) in props.data.vitals"
              :key="name"
            >
              <th class="text-left capitalize pl-3 py-1">
                {{ name }}
              </th>
              <td class="text-right pr-3 py-1">
                {{ vital }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { MonsterData } from "../../models/Monster";

  const props = defineProps<{data: MonsterData}>();
</script>
