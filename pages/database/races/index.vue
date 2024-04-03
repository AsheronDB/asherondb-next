<template>
  <div>
    <PageBreadcrumb />
    <PageHeader />
    <div class="p-4 space-y-4">
      <UTable :columns :rows="races">
        <template #name-data="{ row }">
          <nuxt-link :to="'/database/races/' + row.handle">
            <p class="font-bold">
              {{ row.name }}
            </p>
          </nuxt-link>
        </template>
      </UTable>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
console.log(route);

const races = [
  {
    name: "Aluvian",
    handle: "aluvian",
    augmentation: "Jack of All Trades",
    race: "Isparian",
    masteries: ["Daggers", "Bow"],
    added_at: "Release",
  },
  {
    name: "Gharu'ndim",
    handle: "gharundim",
    augmentation: "Jack of All Trades",
    masteries: ["Magical Spells", "Staves"],
    race: "Isparian",
    added_at: "Release",
  },
  {
    name: "Sho",
    handle: "sho",
    augmentation: "Jack of All Trades",
    masteries: ["Bows", "Unarmed Weapons"],
    race: "Isparian",
    added_at: "Release",
  },
];

definePageMeta({
  title: "Player Races",
});
</script>
