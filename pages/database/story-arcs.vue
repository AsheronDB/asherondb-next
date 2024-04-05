<template>
  <Page>
    <UTable

      :rows="data"
    >
      <!-- <template #name-data="{ row }">
        <nuxt-link :to="'/database/races/' + row.handle">
          <p class="font-bold">
            {{ row.name }}
          </p>
        </nuxt-link>
      </template> -->
    </UTable>
  </Page>
</template>

<script setup lang="ts">
const route = useRoute();
console.log(route);

const data = [{
    "name": "The Fire in the Sky"
},{
    "name": "The Fourth Sending of Darkness"
}, {
    "name": "The Rise of the New Singularity"
}, {
    "name": "Elements of Revenge"
}, {
    "name": "A Time of Chaos"
}, {
    "name": "The Shattered Coil"
}, {
    "name": "The War of Blood and Shadow"
}, {
    "name": "Favored Sons"
}, {
    "name": "The Blighted Dreamer"
}, {
    "name": "The Crystalline Crag"
}, {
    "name": "Return of the Gear Knights"
}, {
    "name": "The Apostates"
}, {
    "name": "His Eternal Splendor"
}, {
    "name": "The Shadow Invasion"
}, {
    "name": "Rynthid"
}, {
    "name": "Viridian Rise"
}]


definePageMeta({
title: "Story Arcs",
});

</script>
