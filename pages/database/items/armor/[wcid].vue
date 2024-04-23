<template>
  <Page>
    <!-- <PageBreadcrumb :key="title" /> -->
    <WeenieClothing :data="weenie" />
    <!-- TODO: Links -->
  </Page>
</template>

<script setup lang="ts">
const route = useRoute()
const title = ref("Armor")

const wcid = route.params.wcid
const weenie = ref()

definePageMeta({
  // title: weenie?.name, // Might need to make reactive, it's only a ref right now
  validate: async (route) => {
    if (
      typeof route.params.wcid !== "string"
      || !/^\d+$/.test(route.params.wcid)
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
      return false
    }

    return true
  },
})

const { data } = await useFetch(`/api/weenie/${wcid}`)
// TODO: Handle bad fetch
weenie.value = data.value?.data

title.value = weenie?.value.name
route.meta.title = weenie?.value.name
route.matched[route.matched.length - 1].meta.title = weenie?.value.name
</script>
