<template>
  <Page>
    <!-- <PageBreadcrumb :key="title" /> -->
    <!-- <component :is="view" :data="weenie" /> -->

    <div class="py-6">
      <WeenieItem :data="weenie" />
    </div>

    <!-- TODO: Links -->

    <div class="pb-6">
      <UHorizontalNavigation
        :links="links"
        class="border-b border-gray-700 bg-gray-800/40 px-2 rounded-t"
      />

      <div class="bg-gray-800 py-6 px-4 rounded-b">
        <div
          v-for="section in sections"
          v-show="route.hash === '#' + section.key"
          :key="section.key"
        >
          {{ section.content }}
        </div>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
const route = useRoute()
const title = ref("Weapon")

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

// Dynamically decide component to use for rendering based on type

title.value = weenie?.value.name
route.meta.title = weenie?.value.name
route.matched[route.matched.length - 1].meta.title = weenie?.value.name

const links = [
  {
    label: "Screenshots",
    to: route.path + "#trophies",
  },
  {
    label: "Sounds",
    to: route.path + "#sounds",
  },
]

const sections = [
  {
    label: "Trophies",
    key: "trophies",
    content: "Trophy Section content",
  },
  {
    label: "Sounds",
    key: "sounds",
    content: "Sound Section content",
  },
]
</script>
