<template>
  <Page>
    <div v-if="!!error">
      Error Loading skills
    </div>
    <div v-else>
      <UTable
        :columns
        :rows="skills"
      >
        <template #name-data="{ row }">
          <p class="font-bold">
            {{ row.name }}
          </p>
        </template>
      </UTable>
    </div>
  </Page>
</template>

<script setup lang="ts">
const datStore = useDatStore()

definePageMeta({
  title: "Skills",
})

const { data: skills, error } = await useFetch(`/api/dats/${datStore.current}/skills`)

const columns = [
  {
    key: "id",
    label: "Id",
    class: "w-[0.1%] text-center",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "description",
    label: "Description",
  },
]
</script>
