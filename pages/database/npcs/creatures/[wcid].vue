<template>
  <Page>
    <!-- <PageBreadcrumb :key="title" /> -->
    <Creature :data="weenie" />
    <!--
      TODO: I'm not sure what this is but it was part of the content
            that went into the Creature component but I pulled it out
    -->
    <div>
      <!-- <UTabs :items="items" /> -->
      <UHorizontalNavigation
        :links="links"
        class="rounded-t border-b border-gray-700 bg-gray-800/40 px-2"
      />

      <div class="rounded-b bg-gray-800 px-4 py-6">
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
// TODO: This should autoimport but I had to manually define it. What's going on?
import Creature from "~/components/Weenie/Creature.vue"

const route = useRoute()
const title = ref("Weenie")

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

// console.log(route)

// const selected = ref(0);

// const attributes = computed(() => Object.entries(weenie?.value.attributes));
// const vitals = computed(() => Object.entries(weenie?.value.vitals));

// const vitals = computed(() => weenie.value && weenie.value.vitals ? Object.entries(weenie.value.vitals) : []);

title.value = weenie?.value.name
route.meta.title = weenie?.value.name
route.matched[route.matched.length - 1].meta.title = weenie?.value.name

// // const defaultTabIndex = ref(route.hash ? items.findIndex(item => ('#' + item.slot) === route.hash) : 0);

// const selected = computed({
//   get() {
//     console.log("selected getter");

//     if (route.hash) {
//       const index = items.findIndex((item) => "#" + item.slot === route.hash);
//       console.log(selected);
//       if (index === -1) {
//         return 0;
//       }
//       return index;
//     } else {
//       return 0;
//     }

//   },
//   set(value) {
//     console.log("selected setter");
//     // Hash is specified here to prevent the page from scrolling to the top
//     router.replace({ hash: `#${items[value].slot}` });
//   },
// });

const links = [
  {
    label: "Trophies",
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
