export default defineNuxtPlugin(async () => {
  const asyncData = await useFetch("/api/dats")

  return {
    provide: {
      availableDats: asyncData.data.value,
    },
  }
})
