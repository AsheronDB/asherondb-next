<template>
  <Page>
    <div v-if="!!error">
      Error loading sounds
    </div>
    <div v-else>
      <UTable
        :columns
        :rows="sounds"
      >
        <template #id-data="{ row }">
          <p class="font-bold">
            0x{{ ("00000000" + row.toString(16)).slice(-8) }}
          </p>
        </template>
        <template #preview-data="{ row }">
          <audio
            controls="true"
            preload="none"
          >
            <source
              :src="(`/api/dats/${datStore.current}/waves/${row}?stream=1`)"
              type="audio/wav"
            >
            Your browser does not support the audio element.
          </audio>
        </template>
      </UTable>
    </div>
  </Page>
</template>

<script setup lang="ts">
const datStore = useDatStore()

definePageMeta({
  title: "Sounds",
})

const { data: sounds, error } = await useFetch(`/api/dats/${datStore.current}/waves`)

const columns = [
  {
    key: "id",
    label: "Id",
    class: "w-[0.1%] text-center",
  },
  {
    key: "preview",
    label: "Preview",
  },
]
</script>
