<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types"

const route = useRoute()

type Schema = {
  query: string
}

const state = reactive({
  query: route.query.q || "",
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await navigateTo({
    path: "/search",
    query: {
      q: event.data.query,
    },
  })
}
</script>

<template>
  <UForm

    :state="state"
    @submit="onSubmit"
  >
    <FormInput
      v-model="state.query"
      placeholder="Search database... "
      size="md"
    >
      <UButton
        color="acred"
        size="md"
        type="submit"
      >
        Search
      </UButton>
    </FormInput>
  </UForm>
</template>
