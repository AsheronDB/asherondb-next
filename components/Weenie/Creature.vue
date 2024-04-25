<template>
  <div>
    <div class="space-y-4 py-4">
      <div class="border-primary-800 bg-primary-950 mb-6 border-2">
        <div class="border-primary-800 border-b-2 p-6">
          <h2
            class="text-primary-400 text-center font-serif text-3xl font-normal"
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
            class="flex-0 hidden items-center p-3 text-center font-serif font-normal text-gray-400 lg:flex"
          >
            {{ props.data.creatureTypeName }}<br>Title<br>Attackable
          </nav>
          <div class="ml-auto flex flex-1 items-stretch justify-end">
            <div
              class="border-primary-800 flex flex-col items-center justify-center border-l-2 px-6 py-3 text-center leading-none"
            >
              <p class="font-serif text-sm leading-none text-gray-400">
                Level
              </p>
              <p
                class="text-primary-400 font-serif text-4xl font-normal leading-none"
              >
                {{ props.data.level }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-8 font-serif">
        <div class="border-primary-800 border-2">
          <h3 class="bg-primary-800 p-3 font-serif text-lg font-bold">
            Attributes
          </h3>
          <table class="w-full">
            <tr
              v-for="(attribute, name) in props.data.attributes"
              :key="name"
            >
              <th class="py-1 pl-3 text-left font-serif capitalize">
                {{ name }}
              </th>
              <td class="py-1 pr-3 text-right font-serif">
                {{ attribute }}
              </td>
            </tr>

            <tr
              v-for="(vital, name) in props.data.vitals"
              :key="name"
            >
              <th class="py-1 pl-3 text-left capitalize">
                {{ name }}
              </th>
              <td class="py-1 pr-3 text-right">
                {{ vital }}
              </td>
            </tr>
          </table>
        </div>

        <div class="border-primary-800 border-2">
          <h3 class="bg-primary-800 p-3 font-serif text-lg font-bold">
            Skills
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MonsterData } from "../../models/Monster"

const props = defineProps<{ data: MonsterData }>()
</script>
